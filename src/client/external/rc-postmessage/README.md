### If you need to update the code and publish
- npm i
- npm run build

---
### demo
 - path: example
 - way: Open host.html in the browser
---

### docs
 - path: docs
 - way: Open index.html in the browser
---

### Import package
 - "rc-postmessage": "git+ssh://git@git.ringcentral.com:lib/rc-postmessage.git#master"
---
## SDK API
  
### initialization:
   ```typescript
    // In host:
    // import PostMessageManager
    import { PostMessageManager } from 'rc-postmessage';

    const targetOrigin = 'http://www.app.com'; 
    const postMessageManager = new PostMessageManager();

    // use iframe
    const postMessage = this.postMessageManager.create({
      contentWindow: document.getElementById('iframe').contentWindow,
      targetOrigin, // target origin
    });

    // use open window
    const windowObjectReference = window.open('http://www.app.com');
    const postMessage = this.postMessageManager.create({
      contentWindow: windowObjectReference,
      targetOrigin
    });
   ```

   ```typescript
    // when app
    // import PostMessageApp
    import { PostMessageApp } from 'rc-postmessage';

    const postMessage = new PostMessageApp();
   ```

### Local Debug mode
  ```typescript
  // host
  const postMessageManager = new PostMessageManager({ debug: true });
  // app
  const postMessage = new PostMessageApp({ debug: true });
  ```

### Sending Messages
  host and app can send messages to each other
  - When sending a message, the event name is the channel
  - To reply to a message, you need to handle channel in target side (host -> app / app -> host)
  - to listener the channel event, you need to on channel in target side (host -> app / app -> host)
  
An example of sending and on messages between the host and app:

```typescript
  // In host sending message
  postMessage.send('RCV', {
    body: 'hello. this is host.'
  });

  // In host listener channel
  postMessage.on('RCM', (payload, messageEvent) => { /* Handle the logic you need */});
```

```typescript
  // In app listener channel
  postMessage.on('RCV', (payload, messageEvent) => { /* Handle the logic you need */});

  // In app sending message
  postMessage.send('RCM', {
    body: 'hello, this is app.'
  });
```

An example of invoke and handle messages between the host and app:

```typescript
  // In host invoke app handle
  const result = await postMessage.invoke('RCV', {
    body: 'hello. this is host.'
  });
  // result.payload === 'hello, this is app'

  // In host handle channel
  postMessage.handle('RCV', (data) => { 
    // return value to app
    // data.payload.body === 'hello. this is app.'
    return 'hello, this is host';
  });
```

```typescript
  // In app handle channel
  postMessage.handle('RCV', (data) => { 
    // return value to host
    // data.payload.body === 'hello. this is host.'
    return 'hello, this is app';
  });

  // In app invoke host handle
  const result = await postMessage.invoke('RCV', {
    body: 'hello. this is host.'
  });
  // result.payload === 'hello, this is host'
```

## Methods:

```typescript
type Payload = any;

const enum ResponseCode {
  SUCCESS = 200,
  ERROR = 400,
  TIMEOUT = 500
};

type Response = {
  payload: Payload;
  code: ResponseCode,
  error?: string,
};

type Listener = (payload: Payload, event: MessageEvent) => void;
```

```typescript
postMessage.on(channel, listener)
```
 - channel: string
 - listener: Listener

*Listens to channel, when a new message arrives listener would be called with listener(payload, event)*


```typescript
postMessage.once(channel, listener)
```
 - channel: string
 - listener: Listener
  
*Adds a one time listener function for the event. This listener is invoked only the next time a message is sent to channel, after which it is removed.*


```typescript
postMessage.removeListener(channel)
```
 - channel: string
  
*remove channel listener.*


```typescript
postMessage.removeAllListeners()
```
  
*remove all listener.*


```typescript
postMessage.send(channel, payload)
```
 - channel: string
 - payload: Payload
  
*sending message via channel, and all listener this channel will receive payload. The target side handles it by listening for channel.*

For example:
```typescript
  // In host sending message
  postMessage.send('RCV', {
    body: 'hello. this is host.'
  });
```

```typescript
  // In app listener channel
  postMessage.on('RCV', (payload, messageEvent) => { /* Handle the logic you need */});
```


```typescript
postMessage.invoke(channel, payload)
```
 - channel: string
 - payload: Payload
 - Returns ```Promise<Response>``` - Resolves with the response from the target side.
  
*Send a message to the target side via channel and expect a result asynchronously.*

For example:
```typescript
  // In host invoke app handle
  const result = await postMessage.invoke('RCV', {
    body: 'hello. this is host.'
  });
  // result.payload === 'hello, this is app'
```

```typescript
  // In app handle channel
  postMessage.handle('RCV', (data) => { 
    // return value to host
    // data.payload.body === 'hello. this is host.'
    return 'hello, this is app';
  });
```


```typescript
postMessage.handle(channel, listener)
```
 - channel: string
 - listener: Listener

*This handler will be called whenever a target side calls postMessage.invoke(channel, payload).*

```typescript
postMessage.handleOnce(channel, listener)
```
 - channel: string
 - listener: Listener
  
*This handler will be called once whenever a target side calls postMessage.invoke(channel, payload).*


```typescript
postMessage.removeHandler(channel)
```
 - channel: string
  
*remove channel handle.*


```typescript
postMessage.removeAllHandler()
```
  
*remove all handle.*

```typescript
postMessage.dispose()
```
  
*remove all listener and handle and window message listener*

---


#### PostMessageManager
**only for host**

postMessageManager.create: *create postMessage instance.*

for Example:
```typescript
type HostProps = {
  contentWindow: any;
  targetOrigin: string;
  timeout?: number;
}; 

const postMessageManager = new PostMessageManager();
const postMessage = postMessageManager.create(options: HostProps);
```

postMessageManager.destroy: *destroy postMessage instance.*

for Example:
```typescript
const postMessageManager = new PostMessageManager();
const postMessage = postMessageManager.create(options);
postMessageManager.destroy(postMessage.id);
```

postMessageManager.broadcast: *all postMessage instance sending message via channel*

for Example:
```typescript
const postMessageManager = new PostMessageManager();
const postMessage = postMessageManager.create(options);
const postMessage2 = postMessageManager.create(options);

postMessageManager.broadcast(channel, payload);
```
