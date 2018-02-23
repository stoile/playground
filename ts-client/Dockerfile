FROM node:9.6-alpine

WORKDIR /opt/

COPY src ./src
COPY types ./types
COPY package.json tsconfig.json tslint.json yarn.lock ./

RUN yarn && yarn lint && yarn build

CMD ["node", "out/main.js", "--server", "server"]