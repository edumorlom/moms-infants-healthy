

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const getLocalizedText = require('./getLocalizedText');
const message = require('./message');


//To call weeks dynamically from json use require(en_En.json) then do json[week] where week can be "week1" for example

exports.sendCustomSMS = functions.https.onRequest((req, res) => {
  message.sendCustomSMS(req.query.phoneNumber, req.body.message)
  .then(message =>  res.status(200).send(message))
  .catch(e => console.log(e))
});

exports.sendWeeklySMS = functions.https.onRequest((req, res) => {
  var ref = admin.database().ref("users");
  let today = new Date();
  let date = (today.getMonth()+1).toString().padStart(2, "0") +'/'+today.getDate().toString().padStart(2, "0") +'/'+ today.getFullYear();
  ref.orderByChild("nextWeek").equalTo(date).once("value")
  .then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      let phoneNumber = childSnapshot.val().phoneNumber;
      let week = "Week" + childSnapshot.val().week;
      let deviceLanguage = childSnapshot.val().deviceLanguage;
      //get messages based on week and device language and whether it is baby message or mother message like "Week1Mother" or "Week1Baby"

      let motherKey = week + "Mother";
      let babyKey = week + "Baby";
      let motherMsg = getLocalizedText.translate(deviceLanguage, motherKey)
      let babyMsg = getLocalizedText.translate(deviceLanguage, babyKey)

      //create SMS with message for mother and another with message for baby
     
      message.sendCustomSMS(phoneNumber, motherMsg);
      message.sendCustomSMS(phoneNumber, babyMsg);

      //Update nextWeek by adding 7 days
      //Update week number   (If weekNumber > 24 set it to null)
      let nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
      let nextWeek = (nextweek.getMonth()+1).toString().padStart(2, "0") +'/'+nextweek.getDate().toString().padStart(2, "0") +'/'+ nextweek.getFullYear()
      let nextWeekNo = childSnapshot.val().week + 1;
      (nextWeekNo < 25) ? null : nextWeekNo = null;  //The messages are only for the first 24 weeks.
      nextWeekNo ? null : nextWeek = null;       //Set the date to null as well. This will remove it from firebase
      childSnapshot.ref.update({
        nextWeek: nextWeek,
        week: nextWeekNo
      });
    })
    return null;
  }).catch(e => console.log(e)) //Redeploy the function
 return res.status(200).send("Sucess");

});

/* exports.sendCustomSMS = functions.https.onRequest((req, res) => {
  console.log(req.body.message);
  client.messages
      .create({
       body: req.body.message,
       from: twilioNumber,
       to: req.query.phoneNumber
      })
      .then(message => res.status(200).send(message))
      .catch(e => console.log(e))
 });  */

/* exports.helloWorld = (req, res) => {
    let message = req.query.message || req.body.message || 'Hello World!';
    res.status(200).send(message);
  };
   */

