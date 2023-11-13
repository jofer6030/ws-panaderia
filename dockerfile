# Use the official Node.js image based on Alpine Linux
FROM node:18-alpine

ARG environment=development

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copiar el archivo de entorno según el entorno especificado
COPY .env.${environment} .env

# Comando para iniciar la aplicación
# CMD ["npm", "run", "dev"]
CMD ["sh", "-c", "NODE_ENV=development npm run dev"]
