import { sendWhatsappMsg } from "../utils/sendWhatsappMsg.util.js";
import { sendText } from "../shared/msgWhatssapModels.shared.js";

import { sanitizeText } from "../utils/sanitizeText.util.js";
import { questionToChatGpt } from "./chat-gpt.js";
import { getMemoryConversationAll, memoryConversation } from "./history-memory.js";

import ApiService from "../services/api.service.js";

export const flowCompra = async (data, socket) => {
  const apiService = new ApiService();

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
    const data = await apiService.createOrUpdateChat(chat);
    // if (data.message === "Created") {
    //   socket.emit("new-chat-notification", { chat });
    // }
    console.log(data);
  } catch (error) {
    console.log(error);
  }

  // const responseChatGpT = await questionToChatGpt(keyWord, userPhoneNumber);

  // await sendWhatsappMsg(sendText(userPhoneNumber, responseChatGpT || "Lo siento, no entendi"));
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

  //   await sendWhatsappMsg(sendText("51922545942", formatResult));
  // }
  // return;
};
