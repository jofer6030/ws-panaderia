import axios from "axios";

class ApiService {
  #apiService;
  #url = "https://bot-seller.onrender.com";

  constructor() {
    this.#apiService = axios;
  }

  async createOrUpdateChat(chat) {
    const { data } = await this.#apiService.post(`${this.#url}/chat/validation`, chat);
    return data;
  }
}

export default ApiService;
