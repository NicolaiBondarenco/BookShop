# Use Node.js 18.14.2 as the base image
FROM node:18.14.2

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Build your React application
RUN npm run build

# Expose a port (e.g., 80) for the application
EXPOSE 80

# Define the command to start your application
CMD ["npm", "start"]
