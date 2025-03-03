#!/bin/bash

# Check if a project name is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <project-name>"
    exit 1
fi

PROJECT_NAME=$1
GIT_REPO="https://github.com/ArthurYdalgo/laravext.git"
STARTER_KIT_DIR="starter-kits/vue"

echo "Creating project: $PROJECT_NAME"

# Create the project directory
mkdir "$PROJECT_NAME"
cd "$PROJECT_NAME" || exit

# Initialize a git repository
git init
git remote add origin "$GIT_REPO"

# Enable sparse-checkout
git config core.sparseCheckout true

# Define the directory to checkout
echo "$STARTER_KIT_DIR" >> .git/info/sparse-checkout

# Pull only the required directory
git pull origin main

# Move files to project root
mv "$STARTER_KIT_DIR"/* .
rm -rf .git "$STARTER_KIT_DIR"

echo "Starter kit installed successfully in $PROJECT_NAME!"
