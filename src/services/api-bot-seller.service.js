import axios from "axios";

class ApiBotSellerService {
  #apiService;
  #url = "https://bot-seller.onrender.com";

  constructor() {
    this.#apiService = axios.create({
      baseURL: this.#url,
    });
  }

  async createOrUpdateChat(chat) {
    const { data } = await this.#apiService.post("/chat/validation", chat);
    return data;
  }
}

export default ApiBotSellerService;
