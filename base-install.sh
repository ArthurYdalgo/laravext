#!/bin/bash

# Ensure project name and stack type are provided
if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Usage: $0 <project-name> <stack: react|vue>"
    exit 1
fi

PROJECT_NAME=$1
STACK=$2
GIT_REPO="https://github.com/ArthurYdalgo/laravext.git"
STARTER_KIT_DIR="starter-kits/$STACK"

# Validate stack type
if [[ "$STACK" != "react" && "$STACK" != "vue" ]]; then
    echo "❌ Invalid stack: $STACK"
    echo "Please use 'react' or 'vue'."
    exit 1
fi

echo "🚀 Creating project: $PROJECT_NAME using $STACK stack"

# Create the project directory
mkdir "$PROJECT_NAME"
cd "$PROJECT_NAME" || exit

# Clone only the necessary files (shallow clone for performance)
git init
git remote add origin "$GIT_REPO"
git fetch --depth=1 origin main

# Enable sparse checkout (fetch only the required starter kit)
git config core.sparseCheckout true
git config core.sparseCheckoutCone false

# Include both normal and hidden files explicitly
echo "$STARTER_KIT_DIR/*" > .git/info/sparse-checkout
echo "$STARTER_KIT_DIR/.*" >> .git/info/sparse-checkout

# Checkout only the required files
git checkout main

# Move files to the project root, including hidden ones
shopt -s dotglob nullglob
mv "$STARTER_KIT_DIR"/* "$STARTER_KIT_DIR"/.* . 2>/dev/null

# Clean up Git files
rm -rf .git "$STARTER_KIT_DIR"

echo "✅ Starter kit installed successfully in $PROJECT_NAME!"

# ---- VERIFY REQUIRED COMMANDS ----
MISSING_TOOLS=()
if ! command -v php &>/dev/null; then
    MISSING_TOOLS+=("PHP")
fi
if ! command -v npm &>/dev/null; then
    MISSING_TOOLS+=("npm")
fi
if ! command -v composer &>/dev/null; then
    MISSING_TOOLS+=("Composer")
fi

# If any tool is missing, prompt user to continue or not
if [ ${#MISSING_TOOLS[@]} -gt 0 ]; then
    echo "⚠️  The following tools are missing: ${MISSING_TOOLS[*]}"
    read -p "❓ Do you want to continue without them? (y/N): " choice
    case "$choice" in
        y|Y ) echo "Skipping missing steps...";;
        * ) echo "❌ Aborting installation."; exit 1;;
    esac
fi

# ---- RUN COMMANDS IF TOOLS ARE AVAILABLE ----

# Install Node dependencies if npm is available
if command -v npm &>/dev/null; then
    echo "📦 Running npm install..."
    npm install
else
    echo "⚠️ Skipping npm install (npm not found)"
fi

# Install PHP dependencies if Composer is available
if command -v composer &>/dev/null; then
    echo "📦 Running composer install..."
    composer install
else
    echo "⚠️ Skipping composer install (Composer not found)"
fi

# Copy .env file and generate Laravel key if PHP is available
if command -v php &>/dev/null; then
    if [ -f ".env.example" ]; then
        echo "📄 Copying .env.example to .env..."
        cp .env.example .env
    else
        echo "⚠️ .env.example file not found, skipping .env setup"
    fi

    echo "🔑 Running php artisan key:generate..."
    php artisan key:generate

    echo "🗄️ Running php artisan migrate..."
    php artisan migrate
else
    echo "⚠️ Skipping Laravel setup (PHP not found)"
fi

echo "✅ Installation complete!"
