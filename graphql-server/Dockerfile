FROM node:9.6-alpine

WORKDIR /opt/

COPY data ./data
COPY package.json package-lock.json server.js ./

RUN npm install

CMD ["npm", "start"]