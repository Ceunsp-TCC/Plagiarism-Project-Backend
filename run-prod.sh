cd /app/plagiarism-platform-backend/build

node ace migration:run --force

dumb-init node server.js
