import axios from "axios";

// const url = "https://graph.facebook.com/v17.0/158011757387515/messages"; //prod
const url = `https://graph.facebook.com/v17.0/${process.env.PHONE_ID}/messages`; //dev

export async function sendWhatsappMsg(data) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN_PHONE}`,
    },
  };

  await axios.post(url, data, options);
}
