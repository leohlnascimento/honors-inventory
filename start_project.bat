@echo off
echo Starting Honors Inventory Project...

:: ask if the user wants to reinitialize the database
set /p INITDB="Do you want to reinitialize the database? (y/N) "
if /i "%INITDB%"=="y" (
    :: second confirmation
    set /p CONFIRM="Are you SURE? The database cannot be recovered. (y/N) "
    if /i "%CONFIRM%"=="y" (
        echo Initializing database...node "%~dp0backend\init_db.js"
    ) else (
        echo Database initialization cancelled.
    )
) else (
    echo Database initialization skipped.
)

REM Start backend
cd /d "%~dp0backend"
:: we use start to open a new terminal window
:: that way, brackend and frontend can run at the same time without blocking each other
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
