# Utilizar una imagen base de Node.js
FROM node:16

# ENV PORT 5000
# ENV MY_SQL dev-env-devopsacademy-pe.chdpe1wgua0r.us-east-1.rds.amazonaws.com
# ENV MY_SQL_USER admin
# ENV MY_SQL_PASSWORD y360y360
# ENV MY_SQL_DB db-bot-seller-dev

RUN nvm install 18
RUN nvm use 18

# Crear y establecer el directorio de trabajo en la aplicación
WORKDIR /usr/src/app

# Copiar el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias
# RUN npm install

RUN rm -rf node_modules
RUN npm install

RUN npm uninstall bcrypt
RUN npm install bcrypt

# Copiar el resto de la aplicación
COPY . .
# Copia el archivo de entorno de node
COPY .env .env

# Exponer el puerto en el que la aplicación se ejecutará (ajusta según tu aplicación)
EXPOSE 80

# Comando para iniciar la aplicación
# CMD ["npm", "start"]
CMD ["npm", "run", "dev"]
