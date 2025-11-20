# Honors Inventory

A full-stack inventory management system for the USF Honors College built with:

- **Backend:** Node.js + SQLite3  
- **Frontend:** React + TypeScript  

## Features

- Add, edit, and delete equipment  
- Transfer equipment between locations  
- Sliding animated forms with exclusive visibility  

## How to Run

Make sure you have Node.js installed.

- Windows
```bat
.\start_project.bat
```
- Linux / MacOS
```sh
cd backend
npm install        # if dependencies aren't installed yet
node init_db.js    # if wishes to reinitialize the database
node index.js
# open new terminal
cd frontend
npm install        # if dependencies aren't installed yet
npm start
```
