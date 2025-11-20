echo "Starting Honors Inventory Project..."

# ask if the user wants to reinitialize the database
read -p "Do you want to reinitialize the database? (y/N) " INITDB

if [[ "$INITDB" =~ ^[Yy]$ ]]; then
    read -p "Are you SURE? The database cannot be recovered. (y/N) " CONFIRM
    if [[ "$CONFIRM" =~ ^[Yy]$ ]]; then
        echo "Initializing database..."
        cd "$(dirname "$0")/backend" || exit
        node init_db.js
        cd ..
    else
        echo "Database initialization cancelled."
    fi
else
    echo "Database initialization skipped."
fi

# start backend
cd "$(dirname "$0")/backend" || exit
echo "Checking backend dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo "Backend dependencies already installed."
fi

echo "Starting backend server..."
# macOS: open new terminal with "osascript"
if [[ "$OSTYPE" == "darwin"* ]]; then
    osascript <<EOF
tell application "Terminal"
    do script "cd \"$(pwd)\"; node index.js"
end tell
EOF

# Linux: use gnome-terminal, but fall back to xterm
else
    if command -v gnome-terminal >/dev/null 2>&1; then
        gnome-terminal -- bash -c "node index.js; exec bash"
    else
        xterm -hold -e "node index.js" &
    fi
fi

# start frontend
cd ../frontend || exit

echo "Checking frontend dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo "Frontend dependencies already installed."
fi

echo "Starting frontend..."

# macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    osascript <<EOF
tell application "Terminal"
    do script "cd \"$(pwd)\"; npm start"
end tell
EOF

# Linux
else
    if command -v gnome-terminal >/dev/null 2>&1; then
        gnome-terminal -- bash -c "npm start; exec bash"
    else
        xterm -hold -e "npm start" &
    fi
fi

echo "All servers started."
