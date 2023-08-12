FROM node:buster-slim


WORKDIR /app/school-guardian-backend


COPY package*.json .


RUN npm install

ENV CHOKIDAR_USEPOLLING=true
COPY . .

CMD node ace serve --watch


