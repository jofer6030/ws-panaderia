import { sanitizeText } from "../utils/sanitizeText.util.js";
import { questionToChatGpt } from "./chat-gpt.js";

import ApiBotSellerService from "../services/api-bot-seller.service.js";
import ApiWhatsappService from "../services/api-whatsapp.service.js";

export const flowCompra = async (data, socket) => {
  const apiBotSellerService = new ApiBotSellerService();
  const apiWhatsappService = new ApiWhatsappService();

  const dataType = data.text || data.image || data.audio;

  const content = sanitizeText(dataType.body || dataType.caption || "");

  const chat = {
    phone: data.from,
    name: data.name,
    message: {
      id: data.id,
      role: "user",
      type: data.type,
      idMedia: dataType.id || "",
      content,
      status: "",
      timestamp: data.timestamp,
    },
  };

  socket.emit("new-message", { info: chat.message, phone: chat.phone });

  let dataChat;

  try {
    dataChat = await apiBotSellerService.createOrUpdateChat(chat);
    const chatInfo = dataChat.chats[0];

    if (dataChat.message.includes("create")) {
      socket.emit("new-chat-notification", chatInfo);
    } else {
      socket.emit("update-last-message", chatInfo);
    }
  } catch (error) {
    console.log(error);
  }

  if (dataChat && dataChat.chats[0].status === "bot" && data.type === "text") {
    const responseChatGpT = await questionToChatGpt(dataChat);
    const responseToClient = responseChatGpT || "Lo siento no entendi, repita su pregunta por favor 😊";
    const dataWS = await apiWhatsappService.sendWhatsappText(data.from, responseToClient);

    const message = {
      role: "assistant",
      content: responseToClient,
      timestamp: new Date().getTime(),
      status: "",
      id: dataWS.messages[0].id,
      type: "text",
      idMedia: "",
    };

    const chatInfo = await apiBotSellerService.createOrUpdateChat({
      message,
      phone: dataChat.chats[0].phone,
      name: dataChat.chats[0].name,
    });

    socket.emit("new-message", { info: message, phone: chatInfo.chats[0].phone });
    socket.emit("update-last-message", chatInfo.chats[0]);

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
