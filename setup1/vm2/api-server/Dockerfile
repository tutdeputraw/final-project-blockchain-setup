FROM node:14-alpine

WORKDIR /app

COPY package.json .
RUN yarn install

COPY . .

CMD ["yarn", "start-dev"]

EXPOSE 4000