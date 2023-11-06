# Utilizar una imagen base de Node.js
FROM node:18-alpine

ENV OPENAI_API_KEY=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
ENV PINECONE_ENVIRONMENT=gcp-starter
ENV PINECONE_API_KEY=fe3e721d-1284-43d9-9781-36650e27bf29

# Crear y establecer el directorio de trabajo en la aplicación
WORKDIR /usr/src/app

# Copiar el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias
# RUN npm install

RUN rm -rf node_modules
RUN npm install

# Copiar el resto de la aplicación
COPY . .
# Copia el archivo de entorno de node
COPY .env .env

# Exponer el puerto en el que la aplicación se ejecutará (ajusta según tu aplicación)
EXPOSE 5000

# Comando para iniciar la aplicación
# CMD ["npm", "start"]
CMD ["npm", "run", "dev"]
