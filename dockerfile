# Use the official Node.js image based on Alpine Linux
FROM node:18-alpine

ENV PORT=5000
ENV OPENAI_API_KEY=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
ENV PINECONE_ENVIRONMENT=gcp-starter
ENV PINECONE_API_KEY=fe3e721d-1284-43d9-9781-36650e27bf29

ENV PHONE_ID = 152513131272038
ENV TOKEN_PHONE = EAALwVdtRjxYBOzZCPGRbLs6h6IKktPgGesxfr7mtjhMp07xRbdTg0K4ZBFBCnb2VboL62erqLmm1egx3ZASpTqGljb5kdmW9d5wWuzm2yVVTfuCaYcTz2BpuZBe9yEIAtSU0aZB7xxpW5Wb4euyXDXjZBa3DOqmD9tqGXYd4KCv7KR1dgZCgVi01rjloct3zKPTqb2R89Pe0fmfdCjX
ENV URL_BACKEND = https://botsellar.svc.2cloud.pe
ENV PHONE_ID_WS = 158011757387515
ENV TOKEN_PHONE_WS = EAALwVdtRjxYBOzZCPGRbLs6h6IKktPgGesxfr7mtjhMp07xRbdTg0K4ZBFBCnb2VboL62erqLmm1egx3ZASpTqGljb5kdmW9d5wWuzm2yVVTfuCaYcTz2BpuZBe9yEIAtSU0aZB7xxpW5Wb4euyXDXjZBa3DOqmD9tqGXYd4KCv7KR1dgZCgVi01rjloct3zKPTqb2R89Pe0fmfdCjX

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
