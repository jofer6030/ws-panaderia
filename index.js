import dotenv from 'dotenv';
import Server from "./src/Server.js";

// dotenv.config();
const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}`});

const server = new Server();

server.listen();
