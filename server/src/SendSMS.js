require("dotenv").config();
const twilio = require("twilio");

if (typeof window === "undefined") {
  // Import HttpsProxyAgent only on the server side
  const HttpsProxyAgent = require("https-proxy-agent");
  // Additional server-side configurations or logic
}

const accountSID = process.env.AccountSID;
const authTOKEN = process.env.authTOKEN;

const client = twilio(accountSID, authTOKEN);

const sendSMS = async (body) => {
  let msgOptions = {
    from: process.env.TwilioNum,
    to: process.env.MyNumber,
    body,
  };

  try {
    // Twilio SMS sending logic
    await client.messages.create(msgOptions);
    console.log("SMS sent successfully!");
  } catch (error) {
    console.error("Error sending SMS:", error);
  }

  // Additional logic related to SMS sending (if any)
};
module.exports = { sendSMS };
