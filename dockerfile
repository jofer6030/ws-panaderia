# Use the official Node.js image based on Alpine Linux
FROM node:18-alpine

# ENV PORT=5000
ENV OPENAI_API_KEY=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
ENV PINECONE_ENVIRONMENT=gcp-starter
ENV PINECONE_API_KEY=fe3e721d-1284-43d9-9781-36650e27bf29

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port on which the application will run
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]
