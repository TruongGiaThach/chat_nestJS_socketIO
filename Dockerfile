FROM node:16

COPY package*.json ./

RUN npm ci

COPY . .
RUN ls -l
CMD node /dist/main
