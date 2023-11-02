import { sanitizeText } from "../utils/sanitizeText.util.js";
import { questionToChatGpt } from "./chat-gpt.js";

import ApiBotSellerService from "../services/api-bot-seller.service.js";
import ApiWhatsappService from "../services/api-whatsapp.service.js";

export const flowCompra = async (data, socket) => {
  const apiBotSellerService = new ApiBotSellerService();
  // const apiWhatsappService = new ApiWhatsappService();

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

  try {
    const data = await apiBotSellerService.createOrUpdateChat(chat);
    // if (data.message === "Created") {
    //   socket.emit("new-chat-notification", { chat });
    // }
    console.log(data);
  } catch (error) {
    console.log(error);
  }

  // const responseChatGpT = await questionToChatGpt(keyWord, userPhoneNumber);

  // await sendWhatsappMsg(sendText(userPhoneNumber, responseChatGpT || "Lo siento, no entendi"));
  // await apiWhatsappService.sendWhatsappText(userPhoneNumber, responseChatGpT || "Lo siento, no entendi");
  // if (
  //   (responseChatGpT && responseChatGpT.includes("😊")) ||
  //   responseChatGpT.includes("⏳") ||
  //   responseChatGpT.includes("🙏") ||
  //   responseChatGpT.includes("Estaremos en contacto en breve, en un plazo de 10 minutos") ||
  //   responseChatGpT.includes("10 minutos")
  // ) {
  //   const summaryOrder = getMemoryConversationAll(userPhoneNumber).findLast((item) => {
  //     return item.role === "assistant" && item.content.includes("Resumen de la orden");
  //   }).content;
  //   const formatSummaryOrder = summaryOrder.split("\n\n").find((item) => item.includes("Resumen"));
  //   const formatResult = formatSummaryOrder + `\n- NroCel:${userPhoneNumber}`;
  //   console.log(formatResult);

  // await sendWhatsappMsg(sendText("51922545942", formatResult));
  //   await apiWhatsappService.sendWhatsappText("51922545942", formatResult);
  // }
  // return;
};
