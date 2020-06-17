
const twilio = require('twilio');
const twilioAccount = require('./twilio_account');
const accountSid = twilioAccount.accountSid;
const authToken = twilioAccount.authToken;
const client = new twilio(accountSid, authToken);
const twilioNumber = '+19046472206';



   module.exports = {
    sendCustomSMS: function (phoneNumber, message) {
        return client.messages.create({
         body: message,
         from: twilioNumber,
         to: phoneNumber
        })
        
    }
  };