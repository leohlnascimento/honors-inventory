#!/bin/bash

echo "Starting Honors Inventory Project..."

read -p "Do you want to reinitialize the database? (y/N) " INITDB

if [[ "$INITDB" == "y" || "$INITDB" == "Y" ]]; then
  read -p "Are you SURE? The database cannot be recovered. (y/N) " CONFIRM
  if [[ "$CONFIRM" == "y" || "$CONFIRM" == "Y" ]]; then
    echo "Initializing database..."
    cd backend || exit
    node init_db.js
    cd ..
  else
    echo "Database initialization cancelled."
  fi
else
  echo "Database initialization skipped."
fi

# Start backend
cd backend || exit
if [ ! -d "node_modules" ]; then
  npm install
fi
echo "Starting server..."
node index.js &

# Start frontend
cd ../frontend || exit
if [ ! -d "node_modules" ]; then
  npm install
fi
echo "Starting frontend..."
npm start &

echo "All servers started."
wait
