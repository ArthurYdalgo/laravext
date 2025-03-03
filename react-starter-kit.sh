#!/bin/bash

# Check if a project name is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <project-name>"
    exit 1
fi

PROJECT_NAME=$1
GIT_REPO="https://github.com/ArthurYdalgo/laravext.git"
STARTER_KIT_DIR="starter-kits/react"

echo "🚀 Creating project: $PROJECT_NAME"

# Create the project directory
mkdir "$PROJECT_NAME"
cd "$PROJECT_NAME" || exit

# Clone only the necessary files (shallow clone for performance)
git init
git remote add origin "$GIT_REPO"
git fetch --depth=1 origin main

# Enable sparse checkout (to fetch only the starter kit folder)
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
