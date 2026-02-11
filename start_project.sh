#!/bin/bash

echo "=========================================="
echo "   HONORS INVENTORY PROJECT MANAGER      "
echo "=========================================="

# 1. check for node_modules at root
if [ ! -d "node_modules" ]; then
  echo "📦 Initializing workspace and installing dependencies..."
  npm install
else
  echo "📦 Synchronizing dependencies..."
  # faster if almost everything is already installed
  npm install --no-audit --no-fund
fi

# 2. optional db reset
read -p "🔄 Reinitialize database? (y/N) " INITDB
if [[ "$INITDB" =~ ^[Yy]$ ]]; then
  read -p "⚠️  Are you SURE? This wipes all data. (y/N) " CONFIRM
  if [[ "$CONFIRM" =~ ^[Yy]$ ]]; then
    echo "🏗️  Building database..."
    node backend/scripts/init_db.js
  else
    echo "❌ Reset cancelled."
  fi
else
  echo "Reset skipped."
fi

# 3. start the entire Workspace
echo "🚀 Starting Frontend and Backend simultaneously..."
echo "Press Ctrl+C to stop both servers."
echo "------------------------------------------"
# concurrently command set up in root package.json
npm run dev