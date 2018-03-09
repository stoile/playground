FROM node:9.6-alpine

WORKDIR /opt/

COPY package.json yarn.lock ./

RUN yarn install --prod

COPY data ./data
COPY server.js ./

CMD ["yarn", "run", "start"]
