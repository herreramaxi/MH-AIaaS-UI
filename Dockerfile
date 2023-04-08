# syntax=docker/dockerfile:1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

CMD ["npm", "start"]
