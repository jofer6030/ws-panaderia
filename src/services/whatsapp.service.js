import { flowCompra } from "../flows/flowCompra.js";

import { io } from "socket.io-client";

const socket = io("https://qx4l1062-3000.brs.devtunnels.ms");

class WhatsAppService {
  constructor() {}

  async verifyToken(req, res) {
    const accessToken = "testT0ken";
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (challenge !== null && token !== null && token === accessToken) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(400);
    }
  }

  async recievedMessage(req, res) {
    const entry = req.body["entry"][0];
    const changes = entry["changes"][0];
    const value = changes["value"];
    const statuses = value["statuses"];
    const messageObject = value["messages"];

    if (typeof statuses !== "undefined") {
      const message = statuses[0];
      const id = message["id"];
      const status = message["status"];
      socket.emit("status", { id, status });
    }

    if (typeof messageObject !== "undefined") {
      const message = messageObject[0];
      const contact = value["contacts"];
      const name = contact[0].profile.name;

      flowCompra({ ...message, name }, socket);
    }
    res.sendStatus(200);
  }
}

export default WhatsAppService;
