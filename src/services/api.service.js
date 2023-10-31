import axios from "axios";

class ApiService {
  #apiService;
  #url = "https://bot-seller.onrender.com";

  constructor() {
    this.#apiService = axios;
  }
}

export default ApiService;
