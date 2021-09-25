# syntax=docker/dockerfile:1
FROM node:13.12.0-alpine

WORKDIR /player-api

COPY  package.json ./
RUN npm install --silent

COPY . .

RUN npm run build

EXPOSE 8080
CMD [ "node", "dist/app.js" ]