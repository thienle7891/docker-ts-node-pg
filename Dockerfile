FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install
COPY . .

RUN yarn build

FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json .
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . .

RUN yarn build

EXPOSE 8888

CMD ["yarn", "run" , "start","--watch"]



