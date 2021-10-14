
# Github add-in for RingCentral app

## Use

Goto RingCentral Apps -> Notification apps list, find and click GitHub add-in, just follow the instructions.

## YouTube video

[https://youtu.be/qL-7b03U1ow](https://youtu.be/qL-7b03U1ow)

## DEV Prerequisites

- Download and install RingCentral app and login: https://www.ringcentral.com/apps/rc-app
- Nodejs 8.10+/npm, recommend using [nvm](https://github.com/creationix/nvm) to install nodejs/npm.
- Create a GitHub oauth app in your github account, required scopes: `admin:repo_hook read:user read:org`
- Create a AWS account, we will use free AWS dynamodb, and put your aws credentials in `~/.aws/credentials`, check [https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)
- To get a sense how would it work, you can use GitHub 2.0 integration in RingCentral app's App list, check the video: [https://youtu.be/qL-7b03U1ow](https://youtu.be/qL-7b03U1ow)

## Quick start

Let's start a simple RingCentral add-in that post github messages to a RingCentral team you selected.

```bash

# get code
git clone git@github.com:ringcentral/github-add-in.git
cd github-add-in

# install dependecies
npm i

# start proxy server, this will make your local bot server can be accessed by RingCentral service
npm run ngrok

# will show
Forwarding                    https://xxxx.ap.ngrok.io -> localhost:6066
# Remember the https://xxxx.ap.ngrok.io, we will use it later
```

Goto RingCentral app's App list, select [Incoming WebHooks](https://www.ringcentral.com/apps/glip-webhooks) app, and choose a team, and copy the `glip webhook url` for later test use, and confirm install.

```bash
# create env file
cp .env.sample .env
# then edit .env,
# set https://xxxx.ap.ngrok.io as RINGCENTRAL_APP_SERVER
# set GITHUB_CLIENT_ID GITHUB_CLIENT_SECRET (from github oauth app you created)

# run local dev server
npm start

# run client in another terminal
npm run c
```

Then visit [ringcentral-notification-app-developer-tool](https://ringcentral.github.io/ringcentral-notification-app-developer-tool/)

- `App url` : Use `https://xxxx.ap.ngrok.io` we started
- `Webhook Url`: Use `glip webhook url` we copied from prev step

Then click submit, this will simulate the situation running in real RingCentral app, just try it~

Then you can edit src files and play with the project.

## Links

- [Framework to help creating notification apps](https://github.com/ringcentral/ringcentral-add-in-framework-js)
- [Helper module to handle communication with RingCentral app](https://github.com/ringcentral/ringcentral-notification-integration-helper)

## Deploy to AWS Lambda

```bash
cp deploy/env.sample.yml deploy/env.yml
cp deploy/serverless.sample.yml deploy/serverless.yml

# then edit deploy/env.yml and deploy/serverless.yml

# deploy
npm run deploy
```

More detail: https://github.com/ringcentral/glip-integration-js/blob/master/docs/deploy-to-lambda.md

## License

MIT
