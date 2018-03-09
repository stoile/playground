FROM node:9.6-alpine

WORKDIR /opt/

COPY package.json package-lock.json ./

RUN npm install --production

COPY data ./data
COPY server.js ./

CMD ["npm", "start"]
