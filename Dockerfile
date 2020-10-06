FROM node:14.5.0-alpine as builder

COPY . .

RUN npm i
RUN npm run build

FROM builder as test

COPY package.json .eslintrc.js ./

RUN npm run lint
RUN npm run test
