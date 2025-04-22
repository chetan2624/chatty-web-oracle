
#!/bin/bash

# Print colorful messages
print_message() {
    echo -e "\033[1;34m$1\033[0m"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_message "Node.js is not installed. Please install Node.js first."
    print_message "Visit: https://nodejs.org/en/download/"
    exit 1
fi

# Check if Git is installed
if ! command -v git &> /dev/null; then
    print_message "Git is not installed. Please install Git first."
    print_message "Visit: https://git-scm.com/downloads"
    exit 1
fi

# Check if VS Code is installed
if ! command -v code &> /dev/null; then
    print_message "VS Code is not installed. Please install VS Code first."
    print_message "Visit: https://code.visualstudio.com/download"
    exit 1
fi

print_message "Starting local project setup..."

# Create project directory
PROJECT_NAME="my-lovable-app"
print_message "Creating project directory: $PROJECT_NAME"
mkdir -p $PROJECT_NAME
cd $PROJECT_NAME

# Initialize git repository
print_message "Initializing git repository..."
git init

# Initialize package.json
print_message "Initializing npm project..."
npm init -y

# Install core dependencies
print_message "Installing dependencies..."
npm install react react-dom @vitejs/plugin-react-swc vite typescript @types/react @types/react-dom

# Create basic project structure
print_message "Creating project structure..."
mkdir -p src/components
mkdir -p src/pages
mkdir -p public

# Open VS Code
print_message "Opening VS Code..."
code .

# Start the development server
print_message "Starting the development server..."
npm run dev

print_message "Setup complete! 🎉"
print_message "The development server should be running at http://localhost:8080"
print_message "You can now start developing your application!"

