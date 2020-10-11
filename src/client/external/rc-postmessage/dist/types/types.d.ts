declare type HostProps = {
  contentWindow: any;
  targetOrigin: string;
  timeout?: number;
};
declare type AppProps = {
  targetOrigin?: string;
  timeout?: number;
};
declare type BaseProps = {
  contentWindow: any;
  targetOrigin?: string;
  timeout?: number;
};
declare type Payload = any;
declare const enum ResponseCode {
  SUCCESS = 200,
  ERROR = 400,
  TIMEOUT = 500
}
declare const enum EventType {
  EVENT = "event",
  HANDLE = "handle"
}
declare type Response = {
  payload: Payload;
  code: ResponseCode;
  error?: string;
};
declare const enum Roles {
  HOST = "host",
  APP = "app"
}
declare type Listener = (payload: Payload, event: MessageEvent) => void;
declare class PostMessageBase {
  targetOrigin: string;
  role: Roles;

  invoke: (channel: string, payload?: Payload, timeout?: number) => Promise<Response>;
  handle: (channel: string, listener: Listener) => void;
  handleOnce: (channel: string, listener: Listener) => void;
  removeHandler: (channel: string) => void;
  removeAllHandler: () => void;
  send: (channel: string, payload?: Payload) => void;
  on: (channel: string, listener: Listener) => void;
  once: (channel: string, listener: Listener) => void;
  removeListener: (channel: string) => void;
  removeAllListeners: () => void;

  dispose: () => void;
}
declare class PostMessageHost extends PostMessageBase {
  id: string;
}
declare class PostMessageApp extends PostMessageBase {
}
declare class PostMessageManager {
  create: (options: HostProps) => PostMessageHost;
  destroy: (id: string) => void;
  broadcast: (channel: string, payload?: Payload) => void;
}

export {
  Roles,
  HostProps,
  AppProps,
  BaseProps,
  Payload,
  Listener,
  Response,
  EventType,
  ResponseCode,
  PostMessageBase,
  PostMessageHost,
  PostMessageApp,
  PostMessageManager
};
