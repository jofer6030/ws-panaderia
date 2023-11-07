import { sanitizeText } from "../utils/sanitizeText.util.js";
import { questionToChatGpt } from "./chat-gpt.js";

import ApiBotSellerService from "../services/api-bot-seller.service.js";
import ApiWhatsappService from "../services/api-whatsapp.service.js";

export const flowCompra = async (data, socket) => {
  const apiBotSellerService = new ApiBotSellerService();
  const apiWhatsappService = new ApiWhatsappService();

  const keyWord = sanitizeText(data.text.body);

  const chat = {
    phone: data.from,
    name: data.name,
    message: {
      id: data.id,
      role: "user",
      content: keyWord,
      status: "",
      timestamp: data.timestamp,
    },
  };

  socket.emit("new-message", chat.message);

  let dataChat;

  try {
    dataChat = await apiBotSellerService.createOrUpdateChat(chat);
    const chatInfo = dataChat.chats[0];

    if (dataChat.message.includes("create")) {
      socket.emit("new-chat-notification", chatInfo);
    } else {
      socket.emit("update-last-message", chatInfo);
    }
    console.log(dataChat);
  } catch (error) {
    console.log(error);
  }

  console.log("paso 1");

  if (dataChat && dataChat.status === "bot") {
    console.log("paso 2");
    const responseChatGpT = await questionToChatGpt(dataChat);
    const responseToClient = responseChatGpT || "Lo siento no entendi, repita su pregunta por favor 😊";
    const dataWS = await apiWhatsappService.sendWhatsappText(data.from, responseToClient);

    const message = {
      role: "assistant",
      content: responseToClient,
      timestamp: new Date().getTime(),
      status: "",
      id: dataWS.messages[0].id,
    };

    await apiBotSellerService.createOrUpdateChat({ message, phone: dataChat.phone, name: dataChat.name });

    socket.emit("new-message", message);

    if (
      (responseChatGpT && responseChatGpT.includes("😊")) ||
      responseChatGpT.includes("⏳") ||
      responseChatGpT.includes("🙏") ||
      responseChatGpT.includes("Estaremos en contacto en breve, en un plazo de 10 minutos") ||
      responseChatGpT.includes("10 minutos")
    ) {
      socket.emit("new-order-notification");
    }
    return;
  }
};
