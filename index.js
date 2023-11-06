import dotenv from 'dotenv';
import Server from "./src/Server.js";

dotenv.config();
const server = new Server();

server.listen();
