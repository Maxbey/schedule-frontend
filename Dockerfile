FROM node:alpine

COPY . /usr/src/spa/

WORKDIR /usr/src/spa

RUN npm install
RUN npm run build
CMD npm run serve