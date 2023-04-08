# syntax=docker/dockerfile:1
FROM node:16-alpine
ENV NODE_ENV=production
ENV ENV=production
COPY ["package.json","package-lock.json", "./"]
RUN sudo npm install
COPY . .

RUN npm run build
EXPOSE 4040
CMD ["npm", "start"]
