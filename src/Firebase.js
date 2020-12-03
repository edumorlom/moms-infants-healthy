import * as firebase from 'firebase';
import {NativeModules} from 'react-native';
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';
import firebaseAccount from './firebase_account.json';
import translate from './Components/getLocalizedText';

const config = firebaseAccount;
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
export const signUp = (
  email,
  phoneNumber,
  password,
  fullName,
  dob,
  pregnant,
  infant,
  liveMiami,
  babyDOB,
  nextWeek,
  week
) => {
  createUserWithEmailAndPassword(email, password).then(
    (response) => {
      saveUserInfo(
        response.user.uid,
        phoneNumber,
        fullName,
        dob,
        pregnant,
        infant,
        liveMiami,
        babyDOB,
        nextWeek,
        week
      ).then(
        () => {
          sendWelcomeSMS(fullName, phoneNumber).then((response) =>
            console.log('Text Message Sent Successfully!')
          );
        },
        (e) => {
          alert("ERROR: Couldn't save user information!");
        }
      );
    },
    (e) => {
      alert('ERROR: Email is already associated with another account!');
    }
  );
};

export const createUserWithEmailAndPassword = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const checkEmailExist = async (email) => {
  console.log(`This is the email passed to firebase method  ${email}`);
  return await firebase.auth().fetchSignInMethodsForEmail(email);
};

export const logIn = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const storeObjectInDatabase = (uid, object) => {
  if (!uid) return;
  getUserInfo(uid).on('value', (snapshot) => {
    firebase.database().ref(`users/${uid}`).update(object);
  });
};

export const saveUserInfo = (
  uid,
  phoneNumber,
  fullName,
  dob,
  pregnant,
  infant,
  liveMiami,
  babyDOB,
  nextWeek,
  week
) => {
  if (!uid) return;
  return firebase
    .database()
    .ref(`users/${uid}`)
    .set({
      phoneNumber,
      fullName,
      dob,
      pregnant,
      infant,
      babyDOB,
      liveMiami,
      nextWeek,
      week,
      appointments: null,
    })
    .catch((err) => console.log(err));
};

// Calls the sendCustomSMS cloud function
export const sendWelcomeSMS = async (fullName, phoneNumber) => {
  let deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;
  phoneNumber =
    phoneNumber.substring(0, 2) === '+1' ? phoneNumber : `+1${phoneNumber}`;
  let name = fullName.split(' ')[0];
  let message = translate('welcomeSMS').replace('{NAME}', name);

  return await fetch(
    `https://us-central1-numom-57642.cloudfunctions.net/sendCustomSMS?phoneNumber=${phoneNumber}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({message}),
    }
  );
};

// Gets a reference of a specific user
export const getUserInfo = (uid) => firebase.database().ref(`users/${uid}`);

// fetches a given property from the current user
export const getUserData = async (property) => {
  let uid = firebase.auth().currentUser.uid;
  let address = `users/${uid}/${property}`;
  let value = '';
  await firebase
    .database()
    .ref(address)
    .once('value', (snapshot) => {
      value = snapshot.val();
    });
  return value;
};

// Gets a ref, any ref
export const getRef = (address) => firebase.database().ref(address);

export const passwordReset = (email) => {
  return firebase.auth().sendPasswordResetEmail(email);
};

// Asks for notifications permission
export const registerForPushNotificationsAsync = async (currentUser) => {
  const {existingStatus} = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }
  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  // POST the token to our backend so we can use it to send pushes from there
  let updates = {};
  updates['/expoToken'] = token;
  await firebase.database().ref(`users/${currentUser.uid}`).update(updates);
  // call the push notification
};

// get all users token to sendPushNotification
export const sendPushNotification = async (title, body, data) => {
  const usersRef = await firebase.database().ref('users');

  usersRef.on('value', (users) => {
    let userList = users.val();

    let expoTokenList = [];
    Object.keys(userList).forEach((key) => {
      if (
        userList[key].expoToken &&
        !expoTokenList.includes(userList[key].expoToken.toString()) // token duplicate removal
      ) {
        expoTokenList.push(userList[key].expoToken.toString());
      }
    });
    expoTokenList.forEach((item) => {
      const message = {
        to: item,
        sound: 'default',
        title,
        body,
        badge: 1,
        data: data || {},
      };
      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      }).then((res) => console.log(res));
    });
  });
};

export const uploadImage = async (
  uri,
  user,
  fileName,
  documents,
  setDocuments
) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const uploadDocument = firebase
    .storage()
    .ref(`${user.uid}/${fileName}`)
    .put(blob);

  uploadDocument.on(
    'state_changed',
    (snapshot) => {
      // process loading
    },
    (error) => {
      console.log(error.message);
    },
    () => {
      // successfull uploading and updating the documents state array
      grabImages(user, documents, setDocuments);
    }
  );
};

export const grabImages = (user, documents, setDocuments) => {
  let storageRef = firebase.storage().ref(user.uid);
  // Now we get the references of these images
  storageRef
    .listAll()
    .then(function (result) {
      result.items.forEach(function (imageRef) {
        // Push to list of objects representing documents by url and name
        imageRef.getDownloadURL().then(function (url) {
          makeDocumentsList(url, imageRef.name, documents, setDocuments);
        });
        // displayImage(imageRef);
      });
    })
    .catch((error) => {
      // Handle any errors
      console.log(error);
    });
};

const makeDocumentsList = (url, name, documents, setDocuments) => {
  let found = false;
  documents.forEach((item) => {
    if (item.url == url) {
      found = true;
    }
  });

  if (!found) {
    // created an object to insert the url and name files
    object = {url, name};

    // updating the document state to display it on the phone.
    setDocuments((prevArray) => [...prevArray, object]);
  }
};

// Gets current Uid
export const getUid = () => {
  return firebase.auth().currentUser.uid;
};

// Gets current UEmail
export const getUEmail = () => {
  return firebase.auth().currentUser.email;
};

export const getAuth = () => {
  return firebase.auth();
};

export const deleteAppointment = async (
  id,
  uid,
  objects,
  setObjects,
  eventId
) => {
  if (uid !== null) {
    console.log('EVENT ID >>:', eventId);
    Calendar.deleteEventAsync(eventId).catch((err) => err.message);
    setObjects(objects.filter((item) => item.key !== id));

    const appointments = firebase
      .database()
      .ref(`users/${uid}/appointments/${id}`);
    return appointments.remove();
  }
  console.log("Error: Couldn't get the User appointment Info");
};

export const fetchAppointment = async (uid, setObjects, _isMounted) => {
  _isMounted = true;
  if (uid !== null) {
    await firebase
      .database()
      .ref(`users/${uid}/appointments/`)
      .once('value', (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
          let childKey = childSnapshot.key;
          let childData = childSnapshot.val();
          console.log(childKey);
          console.log(childData);
          if (
            childSnapshot.val() !== null ||
            childSnapshot.val() !== 'undefined'
          ) {
            if (_isMounted) {
              setObjects((prevArray) => [...prevArray, childSnapshot]);
            }
          }
        });
      });
  } else {
    alert("Error: Couldn't get the Appointment Info");
  }
};

export const addAppointment = async (uid, appointmentInfo) => {
  firebase
    .database()
    .ref(`users/${uid}/appointments`)
    .push(appointmentInfo)
    .catch((err) => console.log(err));
};

export const fetchImmunization = async (uid, setObjects, _isMounted) => {
  _isMounted = true;
  if (uid !== null) {
    await firebase
      .database()
      .ref(`users/${uid}/immunizations/`)
      .once('value', (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
          let childKey = childSnapshot.key;
          let childData = childSnapshot.val();
          if (
            childSnapshot.val() !== null ||
            childSnapshot.val() !== 'undefined'
          ) {
            if (_isMounted) {
              setObjects((prevArray) => [...prevArray, childSnapshot]);
            }
          }
        });
      })
      .catch((err) => console.log(err.message));
  } else {
    alert("Error: Couldn't get Immunization Info");
  }
};

export const deleteImmunization = async (id, uid, objects, setObjects) => {
  if (uid !== null) {
    setObjects(objects.filter((item) => item.key !== id));
    const appointments = firebase
      .database()
      .ref(`users/${uid}/immunizations/${id}`);
    return appointments.remove();
  }
  console.log("Error: Couldn't get the User Immunization Info");
};

export const addImmunization = async (uid, immunizationInfo) => {
  firebase
    .database()
    .ref(`users/${uid}/immunizations`)
    .push(immunizationInfo)
    .catch((err) => console.log(err));
};

export const addReference = async (uid, referenceInfo) => {
  firebase
    .database()
    .ref(`users/${uid}/references`)
    .push(referenceInfo)
    .catch((err) => console.log(err));
};

export const fetchReference = async (uid, setReferences, _isMounted) => {
  _isMounted = true;
  if (uid !== null) {
    await firebase
      .database()
      .ref(`users/${uid}/references/`)
      .once('value', (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
          let childKey = childSnapshot.key;
          let childData = childSnapshot.val();
          console.log(childKey);
          console.log(childData);
          if (
            childSnapshot.val() !== null ||
            childSnapshot.val() !== 'undefined'
          ) {
            if (_isMounted) {
              setReferences((prevArray) => [...prevArray, childSnapshot]);
            }
          }
        });
      })
      .catch((err) => console.log(err.message));
  } else {
    alert("Error: Couldn't get Reference Info");
  }
};

export const deleteReference = async (id, uid, references, setReferences) => {
  if (uid !== null) {
    setReferences(references.filter((item) => item.key !== id));
    const reference = firebase.database().ref(`users/${uid}/references/${id}`);
    return reference.remove().catch((err) => console.log(err.message));
  }
  console.log("Error: Couldn't get the Reference Info");
};
