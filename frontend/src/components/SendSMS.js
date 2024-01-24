// SendSMS.js
require("dotenv").config();
const twilio = require("twilio");

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
    await client.messages.create(msgOptions);
    console.log("SMS sent successfully!");
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};

module.exports = { sendSMS };
