FROM node:14.5.0-alpine as builder

RUN mkdir /code
WORKDIR /code

COPY package*.json ./

RUN npm i

FROM builder as test

COPY package.json .eslintrc.js ./

RUN npm run lint
RUN npm run test
