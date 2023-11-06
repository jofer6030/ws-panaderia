# Use the official Node.js image based on Alpine Linux
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port on which the application will run
EXPOSE 5000

# Comando para iniciar la aplicación
# CMD ["npm", "start"]
CMD ["npm", "run", "dev"]
