const twilio = require('twilio');
const twilioAccount = require('./twilio_account');

const accountSid = twilioAccount.accountSid;
const authToken = twilioAccount.authToken;
const client = new twilio(accountSid, authToken);
const twilioNumber = '+19046472206';

/* This function sends a provided message to the provided phoneNumber through the twilio API
notice the function parameters
The function is used by index.js in functions */
module.exports = {
  sendCustomSMS(phoneNumber, message) {
    return client.messages.create({
      body: message,
      from: twilioNumber,
      to: phoneNumber,
    });
  },
};
