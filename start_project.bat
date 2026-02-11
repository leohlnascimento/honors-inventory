@echo off
setlocal enabledelayedexpansion

echo ==========================================
echo    HONORS INVENTORY PROJECT MANAGER      
echo ==========================================

:: 1. check for node_modules at root
if not exist "node_modules" (
  echo 📦 Initializing workspace and installing dependencies...
  call npm install
) else (
  echo 📦 Synchronizing dependencies...
  :: faster if almost everything is already installed
  call npm install --no-audit --no-fund
)

:: 2. optional db reset
set /p INITDB="🔄 Reinitialize database? (y/N) "
if /i "!INITDB!"=="y" (
  set /p CONFIRM="⚠️  Are you SURE? This wipes all data. (y/N) "
  if /i "!CONFIRM!"=="y" (
    echo 🏗️  Building database...
    node backend/scripts/init_db.js
  ) else (
    echo ❌ Reset cancelled.
  )
) else (
  echo Reset skipped.
)

:: 3. start the entire Workspace
echo 🚀 Starting Frontend and Backend simultaneously...
echo Press Ctrl+C to stop both servers.
echo ------------------------------------------
:: concurrently command set up in root package.json
call npm run dev