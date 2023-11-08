import axios from "axios";

class ApiBotSellerService {
  #apiService;
  #url = `${process.env.URL_BACKEND}`;
  
  constructor() {
    this.#apiService = axios.create({
      baseURL: this.#url,
    });
  }

  async createOrUpdateChat(chat) {
    const { data } = await this.#apiService.post("/chat/validation", chat);
    return data;
  }

  async updateStatusMessage(id, status) {
    const { data } = await this.#apiService.post(`/chat/update/chat`, {
      id,
      status,
    });
    return data;
  }

  async getChatById(idChat) {
    const { data } = await this.#apiService.get(`/chat/list/${idChat}`);
    return data;
  }
}

export default ApiBotSellerService;
