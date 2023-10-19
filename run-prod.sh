
node ace migration:run --force
node ace queue:listener &

dumb-init node server.js
