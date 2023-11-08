import { io } from "socket.io-client";

import { flowCompra } from "../flows/flowCompra.js";
import ApiBotSellerService from "../services/api-bot-seller.service.js";

const socket = io("https://botsellar.svc.2cloud.pe", {
  transports: ["websocket"],
  reconnection: true,
});

class WhatsAppController {
  constructor() {}

  verifyToken = async (req, res, next) => {
    try {
      const accessToken = "testT0ken";
      const token = req.query["hub.verify_token"];
      const challenge = req.query["hub.challenge"];

      if (challenge !== null && token !== null && token === accessToken) {
        res.status(200).send(challenge);
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      next(error);
    }
  };

  recievedMessage = async (req, res, next) => {
    try {
      const entry = req.body["entry"][0];
      const changes = entry["changes"][0];
      const value = changes["value"];
      const statuses = value["statuses"];
      const messageObject = value["messages"];

      if (typeof statuses !== "undefined") {
        const message = statuses[0];
        const id = message["id"];
        const status = message["status"];
        this.#updateStatusMessage(id, status, next);
      }

      if (typeof messageObject !== "undefined") {
        const message = messageObject[0];
        const contact = value["contacts"];
        const name = contact[0].profile.name;

        if (typeof message.image !== "undefined") {
          console.log(message);
          return res.sendStatus(200);
        }

        flowCompra({ ...message, name }, socket);
      }
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  #updateStatusMessage = async (id, status) => {
    const apiBotSellerService = new ApiBotSellerService();
    try {
      await apiBotSellerService.updateStatusMessage(id, status);
      socket.emit("update-status-message", { id, status });
    } catch (error) {
      console.log(error);
    }
  };
}

export default WhatsAppController;
