# syntax=docker/dockerfile:1
FROM cimg/node:18.10
ENV NODE_ENV=production
ENV ENV=production
COPY ["package.json","package-lock.json", "./"]
RUN sudo npm install
RUN sudo npm install -g @angular/cli
COPY . .

RUN sudo npm cache clean --force 
RUN sudo npm run build

CMD ["npm", "start"]
