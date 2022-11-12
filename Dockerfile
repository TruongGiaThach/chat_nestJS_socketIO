FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["node"," /usr/src/appdist/main"]
