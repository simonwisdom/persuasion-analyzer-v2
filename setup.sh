#!/bin/bash

# Navigate to the frontend directory and build the React app
cd frontend
npm install
npm run build

# Move the build files to the backend static directory
cp -a dist/. ../backend/static/

# Navigate back to the root
cd ..
