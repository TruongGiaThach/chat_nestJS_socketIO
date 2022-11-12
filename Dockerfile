FROM node:16

COPY package*.json ./

RUN npm ci

COPY . .
CMD ls -l
CMD node /dist/main
