cd /app/plagiarism-platform-backend/build

node ace migration:run --force
node ace swagger:generate
dumb-init node server.js
