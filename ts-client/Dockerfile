FROM node:9.6-alpine as builder
WORKDIR /opt/

COPY package.json yarn.lock ./

RUN yarn

COPY tsconfig.json tslint.json ./

COPY src ./src
COPY types ./types

RUN yarn lint && yarn build


FROM node:9.6-alpine
WORKDIR /opt/

COPY --from=builder /opt/package.json /opt/yarn.lock ./
RUN yarn --prod

COPY --from=builder /opt/out/main.js ./

CMD ["node", "main.js", "--server", "server"]
