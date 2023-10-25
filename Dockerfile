FROM node:16.19-alpine


RUN apk add --no-cache chromium-chromedriver

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

WORKDIR /app/school-guardian-backend


COPY package*.json .


RUN npm install

ENV CHOKIDAR_USEPOLLING=true
COPY . .

CMD node ace serve --watch


