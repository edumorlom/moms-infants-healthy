import React from "react";
import LogIn from "./src/Components/LogIn";
import SignUp from "./src/Components/SignUp";
import Homepage from "./src/Components/Homepage";
import Firebase from "./src/Components/Firebase";
import { AsyncStorage, NativeModules } from "react-native";
import getLocalizedText from "./src/Components/getLocalizedText";
import SettingScreen from "./src/Components/SettingScreen";
import ForgotPasswordPage from "./src/Components/ForgotPasswordPage";
import * as firebase from "firebase";

export default class App extends React.Component {
  state = {
    screen: "login",
    uid: null,
    email: null,
    password: null,
    fullName: null,
    //babyGender: null,
    deviceLanguage:
      Platform.OS === "ios"
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier,
  };

  constructor(props) {
    super(props);
    this.getCookie("email").then((email) => {
      this.getCookie("password").then((password) => {
        if (email && password) this.loginWithEmailPassword(email, password);
      });
    });
  }

  getLocalizedText = (key) => {
    return getLocalizedText(this.state.deviceLanguage, key);
  };

  setAppState = (object) => {
    this.setState(object);
  };

  saveCookie = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value).then((r) =>
        console.log("Stored key to value: ", key, value)
      );
    } catch (e) {
      console.log("Error storeData: " + e);
    }
  };

  getCookie = async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.log("Error getData: " + e);
    }
  };

  loginWithEmailPassword = (email, password) => {
    this.setAppState({ email: email });
    this.setAppState({ password: password });
    this.saveCookie("email", email);
    this.saveCookie("password", password);

    if (email && password) {
      let fb = new Firebase();
      fb.logIn(email, password).then(response => {
        this.loginWithUid(response.user.uid);
        fb.registerForPushNotificationsAsync(response.user)
      }, e => {
        alert("Invalid E-mail and Password Combination!")
      })
    } else {
      alert("Please enter your E-Mail and Password!");
    }
  };

  loginWithUid = (uid) => {
    let fb = new Firebase();
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      "@" +
      today.getHours() +
      ":" +
      today.getMinutes();
    fb.storeObjectInDatabase(uid, {
      lastInteraction: date,
      deviceLanguage: this.state.deviceLanguage,
    });
    fb.getUserInfo(uid).on("value", (snapshot) => {
      this.setAppState({ fullName: snapshot.val().fullName });
      //this.setAppState({babyGender: snapshot.val().babyGender});
      this.setAppState({ screen: "homepage" });
    });
  };

  logout = () => {
    
    this.setAppState({ uid: null });
    this.setAppState({ fullName: null });
    this.setAppState({ screen: "login" });
    this.saveCookie("email", "");
    this.saveCookie("password", "");
    let fb = new Firebase();
    let user = firebase.auth().currentUser;
    fb.registerForPushNotificationsAsync(user);
  };

  goBack = () => {
    if (this.state.screen === "setting")
      this.setAppState({ screen: "homepage" });
    if (this.state.screen === "forgotPassword")
      this.setAppState({ screen: "login" });
  };

  render() {
    if (this.state.screen === "login") {
      return (
        <LogIn
          setAppState={this.setAppState}
          login={this.loginWithEmailPassword}
          getLocalizedText={this.getLocalizedText}
        />
      );
    } else if (this.state.screen === "signup") {
      try {
        return (
          <SignUp
            setAppState={this.setAppState}
            login={this.loginWithEmailPassword}
            getLocalizedText={this.getLocalizedText}
          />
        );
      } catch (err) {
        this.setAppState({ screen: "login" });
      }
    } else if (this.state.screen === "setting") {
      return (
        <SettingScreen
          email={this.state.email}
          password={this.state.password}
          setAppState={this.setAppState}
          goBack={this.goBack}
          setScreen={this.state.screen}
          fullName={this.state.fullName}
          logout={this.logout}
          getLocalizedText={this.getLocalizedText}
        />
      );
    } else if (this.state.screen === "forgotPassword") {
      return (
        <ForgotPasswordPage
          setAppState={this.setAppState}
          goBack={this.goBack}
          setScreen={this.state.screen}
          getLocalizedText={this.getLocalizedText}
        />
      );
    } else {
      return (
        <Homepage
          setAppState={this.setAppState}
          fullName={this.state.fullName}
          logout={this.logout}
          getLocalizedText={this.getLocalizedText}
        />
      );
    }
  }
}
