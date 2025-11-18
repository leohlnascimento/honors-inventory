@echo off
echo Starting Honors Inventory Project...

:: remember to take out these two lines in cause we don't want to reinitialize the database
echo Initializing database...
node init_db.js

REM Start backend
cd backend
:: we use start to open a new terminal window
:: that way, brackend and frontend can run at the same time without blocking each other
echo Starting server...
start cmd /k "node index.js"

REM Start frontend
cd ..
cd frontend
echo Starting frontend...
start cmd /k "npm start"

echo All servers started.
pause
