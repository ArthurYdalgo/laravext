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

# Enable sparse-checkout and allow patterns
git config core.sparseCheckout true
git config core.sparseCheckoutCone false  # Disable cone mode to allow patterns

# Ensure hidden files are included in sparse-checkout
echo "$STARTER_KIT_DIR/*" > .git/info/sparse-checkout
echo "$STARTER_KIT_DIR/.*" >> .git/info/sparse-checkout  # Force hidden files to be included

# Fetch the required files
git pull origin main --depth=1

# Move all files (including hidden ones) to the project root
shopt -s dotglob nullglob  # Enable moving hidden files
mv "$STARTER_KIT_DIR"/* "$STARTER_KIT_DIR"/.* . 2>/dev/null

# Clean up
rm -rf .git "$STARTER_KIT_DIR"

echo "✅ Starter kit installed successfully in $PROJECT_NAME!"
