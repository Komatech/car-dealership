# Use the official Node.js image with TypeScript
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Build TypeScript
RUN npm run compile

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
