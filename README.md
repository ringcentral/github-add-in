
# glip-integration-github

Github integration for Glip team messaging.

CI: https://xrs04-c01-utl11.lab.nordigy.ru/view/glip-integration-apps/job/glip-integration-github/

## YouTube video

[https://youtu.be/bb7RYyDax4U](https://youtu.be/bb7RYyDax4U)

## Use

Goto Glip app list, find and click GitHub, just follow the instructions.

## DEV Prerequisites

- Download and install RingCentral app and login: https://www.ringcentral.com/apps/rc-app
- Nodejs 8.10+/npm, recommend using [nvm](https://github.com/creationix/nvm) to install nodejs/npm.
- If you want to create RingCentral Glip integration that can show in RingCentral Glip apps list, you need a RingCentral developer account that can create Glip integration: you need [sign up](https://developers.ringcentral.com/) and apply for the permission to create Glip integration.

## Quick start

Let's start a simple RingCentral Glip integration that post github messages to a Glip team you selected.

```bash

# install dependecies
npm i

# start proxy server, this will make your local bot server can be accessed by RingCentral service
npm run ngrok

# will show
Forwarding                    https://xxxx.ap.ngrok.io -> localhost:6066
# Remember the https://xxxx.ap.ngrok.io, we will use it later
```

Goto Glip app's App list, select **Webhook** app, and choose a team, and copy the glip webhook url for later use, and confirm install.

```bash
# create env file
cp .env.sample .env
# then edit .env,
# set https://xxxx.ap.ngrok.io as RINGCENTRAL_APP_SERVER
# set glip webhook url copied as STATIC_WEBHOOK
# set GITHUB_CLIENT_ID GITHUB_CLIENT_SECRET (by create github oauth app)

# start dynamodb local
npm run dynamo

# run local dev server
npm start

# run client
npm run c

# then visit https://xxxx.ap.ngrok.io

```

## Deploy to AWS Lambda

```bash
cp deploy/env.sample.yml deploy/env.yml
cp deploy/serverless.sample.yml deploy/serverless.yml

# then edit deploy/env.yml and deploy/serverless.yml

# deploy
npm run deploy
```

More detail: https://github.com/ringcentral/glip-integration-js/blob/master/docs/deploy-to-lambda.md

## production test

Please join `Github notification app feedback` team in Glip first, then visit url: https://zz9zajn5ok.execute-api.us-east-1.amazonaws.com/prod/app?webhook=https://hooks.glip.com/webhook/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvdCI6InUiLCJvaSI6IjQxNTY5OTg0NTE1IiwiaWQiOiIxMTMxNDI5OTE1In0.DkG1pWqXXaMGFTuEDBsnS8E8ZKKkSK-memhj8fDO7s0

https://proxy3.html5beta.com?webhook=https://hooks.glip.com/webhook/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvdCI6InUiLCJvaSI6IjQxNTY5OTg0NTE1IiwiaWQiOiIxMTMxNDI5OTE1In0.DkG1pWqXXaMGFTuEDBsnS8E8ZKKkSK-memhj8fDO7s0