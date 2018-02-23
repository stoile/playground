FROM node:9.6-alpine

WORKDIR /opt/

COPY package.json yarn.lock ./
RUN yarn

COPY src ./src
COPY types ./types
COPY tsconfig.json tslint.json ./
RUN yarn lint && yarn build

CMD ["node", "out/main.js", "--server", "server"]