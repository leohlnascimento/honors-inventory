@echo off
echo Starting Honors Inventory Project...

:: ask if the user wants to reinitialize the database
set /p INITDB="Do you want to reinitialize the database? (y/N) "

if /i "%INITDB%"=="y" goto confirm_db
echo Database initialization skipped.
goto continue

:confirm_db
set /p CONFIRM="Are you SURE? The database cannot be recovered. (y/N) "
if /i "%CONFIRM%"=="y" goto init_db
echo Database initialization cancelled.
goto continue

:init_db
echo Initializing database...
cd /d "%~dp0backend"
node "init_db.js"
cd ..
goto continue

:continue
REM Start backend
cd /d "%~dp0backend"
if not exist "node_modules" npm install
:: we use start to open a new terminal window
:: that way, backend and frontend can run at the same time without blocking each other
echo Starting server...
start cmd /k "node index.js"

REM Start frontend
cd ..
cd /d "%~dp0frontend"
if not exist "node_modules" npm install
echo Starting frontend...
start cmd /k "npm start"

echo All servers started.
pause
