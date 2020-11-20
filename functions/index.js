const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
let fetch = require('node-fetch');
const getLocalizedText = require('./getLocalizedText');
const message = require('./message');

/* This function uses the function from message.js to send a custom message to a phoneNumber */
exports.sendCustomSMS = functions.https.onRequest((req, res) => {
  /* This cloud function is called after user registration to send a welcome message */
  message
    .sendCustomSMS(req.query.phoneNumber, req.body.message)
    .then((message) => res.status(200).send(message))
    .catch((e) => console.log(e));
});

/* This function listens for any update to the infant variable on any user, and if it gets changed to true (as in new infant)
Then it sends a push notification congratulating the user on the new baby
Note that this is a very specific use case, the function would have to be tweaked to trigger a notification on a different condition */
exports.sendPushNotification = functions.database
  .ref('users/{id}/infant')
  .onUpdate((event) => {
    const snapshot = event.after; // Snapshot of the database at the user/:infant level after update
    const ref = event.after.ref.parent; // Reference of the user (One level above infant)

    let messages = []; // Create an empty array to push stuff into

    if (snapshot.val() === true) {
      // If infant is true/ changed to true
      return ref.once('value').then((snapshot) => {
        console.log(snapshot);
        let expoToken = snapshot.val().expoToken; // fetch expotoken (credential for push notification)
        messages.push({
          to: expoToken,
          sound: 'default',
          body:
            'Congratulations on the new baby, we wish your baby a happy and healthy life',
          _displayInForeground: true,
        });
        fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messages),
        });
        return Promise(messages);
      });
    }
    return null;
  });

/* This function triggers daily and it checks to see if today's date matches the date at which one or more users should receive
a weekly message, if so, it sends the correct weekly message to the user(s) */
exports.sendWeeklySMS = functions.https.onRequest((req, res) => {
  let ref = admin.database().ref('users');
  let today = new Date();
  let date = `${(today.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${today
    .getDate()
    .toString()
    .padStart(2, '0')}/${today.getFullYear()}`; // Parse todays date to a string
  ref
    .orderByChild('nextWeek')
    .equalTo(date)
    .once('value') // filters the users for which value of "nextWeek" matches "date"
    .then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        // loops through said filtered users
        let phoneNumber = childSnapshot.val().phoneNumber;
        let week = `week${childSnapshot.val().week}`; // get the week they are on from the db
        let deviceLanguage = childSnapshot.val().deviceLanguage;

        let motherMsg = getLocalizedText.translate(
          deviceLanguage,
          week,
          'Mother'
        ); // fetch mother message
        let babyMsg = getLocalizedText.translate(deviceLanguage, week, 'Baby'); // fetch baby message
        /* Note that every time the user gets two messages each week */

        // create SMS with message for mother and another with message for baby

        message.sendCustomSMS(phoneNumber, motherMsg);
        message.sendCustomSMS(phoneNumber, babyMsg);

        // Update nextWeek by adding 7 days (in preparation for next week)
        let nextweek = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 7
        );
        let nextWeek = `${(nextweek.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/${nextweek
          .getDate()
          .toString()
          .padStart(2, '0')}/${nextweek.getFullYear()}`;
        // Update week number [+1]
        let nextWeekNo = childSnapshot.val().week + 1;
        nextWeekNo < 25 ? null : (nextWeekNo = null); // (If weekNumber > 24 set it to null)
        nextWeekNo ? null : (nextWeek = null); // If weekNo is null set the date to null as well. This will remove it from firebase
        childSnapshot.ref.update({
          // Update the database with the updated values
          nextWeek,
          week: nextWeekNo,
        });
      });
      return null;
    })
    .catch((e) => console.log(e));
  return res.status(200).send('Sucess');
});

/* This function checks if tomorrow matches any of the appointment dates, and if so it sends a reminder to that user
that "tomorrow you've got an appointment" via SMS 
The function triggers every day on its own */
exports.sendAppointmentReminder = functions.https.onRequest((req, res) => {
  let ref = admin.database().ref('users');
  let today = new Date();
  let tomorrow = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );
  let date = `${(tomorrow.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${tomorrow
    .getDate()
    .toString()
    .padStart(2, '0')}/${tomorrow.getFullYear()}`; // This converts the date to a string in the format ["MM/DD/YYYY"]
  ref
    .once('value')
    .then((snapshot) => {
      // This is the way to activate the function to do stuff in the database
      snapshot.forEach((childSnapshot) => {
        // childSnapshot in this case is each individual user
        let appointmentSnapshot = childSnapshot.child('appointments'); // gets a reference to appointments for a user
        let phoneNumber = childSnapshot.val().phoneNumber;
        let deviceLanguage = childSnapshot.val().deviceLanguage;
        let msg = 'Hello, you got an appointment tomorrow'; // This could be made dynamic depending on deviceLanguage

        appointmentSnapshot.forEach((childAptmtSnapshot) => {
          // Loops through each Appointment
          let aptmtDate = childAptmtSnapshot.child('date').val();
          if (aptmtDate === date) {
            // If appt date is tomorrow send reminder
            message.sendCustomSMS(phoneNumber, msg);
          }
        });
      });
      return null;
    })
    .catch((e) => console.log(e));
  return res.status(200).send('Sucess');
});

/* This function triggers every day at 9 am and checks if any appointments occured yesterday (or where scheduled for yesterday)
and if so auto deletes them because we assume they are no longer relevant the day after it was supposed to take place */
exports.deleteAppointment = functions.https.onRequest((req, res) => {
  /* Very similar to  sendAppointmentReminder, check that function for reference */
  let ref = admin.database().ref('users');
  let today = new Date();
  let yesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1
  );
  let date = `${(yesterday.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${yesterday
    .getDate()
    .toString()
    .padStart(2, '0')}/${yesterday.getFullYear()}`;
  ref
    .once('value')
    .then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let appointmentSnapshot = childSnapshot.child('appointments');

        appointmentSnapshot.forEach((childAptmtSnapshot) => {
          let aptmtDate = childAptmtSnapshot.child('date').val();
          if (aptmtDate === date) {
            // Date represents yesterday's date
            childAptmtSnapshot.ref.remove();
          }
        });
      });
      return null;
    })
    .catch((e) => console.log(e));
  return res.status(200).send('Sucess');
});
