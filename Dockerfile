FROM node:alpine

RUN mkdir /users

WORKDIR /users

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 4000

CMD [ "npm", "run", "dev" ]