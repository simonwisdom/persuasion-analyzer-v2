#!/bin/bash

# Install backend dependencies
pip install -r backend/requirements.txt

# Navigate to the frontend directory and install dependencies
cd frontend
npm install

# Build the React app
npm run build

# Move the build files to the backend static directory
cp -a dist/. ../backend/static/

# Navigate back to the root directory
cd ..