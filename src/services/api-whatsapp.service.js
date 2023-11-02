import axios from "axios";

// const url = "https://graph.facebook.com/v17.0/158011757387515/messages"; //prod
// const url = ``; // dev

class ApiWhatsappService {
  #apiService;
  #url = "https://graph.facebook.com/v17.0/152513131272038/messages";

  constructor() {
    this.#apiService = axios.create({
      baseURL: this.#url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer EAALwVdtRjxYBOzZCPGRbLs6h6IKktPgGesxfr7mtjhMp07xRbdTg0K4ZBFBCnb2VboL62erqLmm1egx3ZASpTqGljb5kdmW9d5wWuzm2yVVTfuCaYcTz2BpuZBe9yEIAtSU0aZB7xxpW5Wb4euyXDXjZBa3DOqmD9tqGXYd4KCv7KR1dgZCgVi01rjloct3zKPTqb2R89Pe0fmfdCjX`,
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
