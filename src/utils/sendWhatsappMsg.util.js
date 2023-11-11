import axios from "axios";
import { envs } from "../../configEnv.js";
// const url = "https://graph.facebook.com/v17.0/158011757387515/messages"; //prod
const url = `https://graph.facebook.com/v17.0/${envs.PHONE_ID}/messages`; //dev

export async function sendWhatsappMsg(data) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${envs.TOKEN_PHONE_WS}`,
    },
  };

  await axios.post(url, data, options);
}
