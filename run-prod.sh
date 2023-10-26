
node ace migration:run --force
node ace queue:listener &
node ace scheduler:run &

dumb-init node server.js
