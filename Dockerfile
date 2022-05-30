FROM node:17-alpine3.14

COPY . /app 

WORKDIR /app

RUN npm install

RUN npm run build

ENV PORT 3000

CMD [ "node","./dist/server.js" ]