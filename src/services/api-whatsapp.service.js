import axios from "axios";

// const url = "https://graph.facebook.com/v17.0/158011757387515/messages"; //prod
// const url = ``; // dev

class ApiWhatsappService {
  #apiService;
  // #url = "https://graph.facebook.com/v17.0/152513131272038/messages";
  #url = `https://graph.facebook.com/v17.0/${process.env.PHONE_ID_WS}/messages`;

  constructor() {
    this.#apiService = axios.create({
      baseURL: this.#url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TOKEN_PHONE_WS}`,
      },
    });
  }

  sendWhatsappText = async (phone, msg) => {
    const options = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: phone,
      type: "text",
      text: {
        body: msg,
      },
    };

    const { data } = await this.#apiService.post("/", options);
    return data;
  };
}

export default ApiWhatsappService;
