FROM node:10-slim

WORKDIR /workspace


RUN apt-get update && \
  apt-get install git -y && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

