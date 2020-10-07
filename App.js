import React, { useState, useEffect } from "react";
import LogIn from "./src/Components/LogIn";  //absolute import paths
import SignUp from "./src/Components/SignUp";
import Homepage from "./src/Components/Homepage";
import {
  logIn, 
  registerForPushNotificationsAsync, 
  storeObjectInDatabase,
  getUserInfo
} 
from "./src/Firebase";
import { AsyncStorage, NativeModules } from "react-native";
import SettingScreen from "./src/Components/SettingsScreen";
import ForgotPasswordPage from "./src/Components/ForgotPasswordPage";
//import * as firebase from "firebase";

export default App = () => {

  const initState = {uid: "", email: "", password: "", fullName: ""  /*babyGender: "",*/ }
  const deviceLanguage = Platform.OS === "ios"
        ? NativeModules.SettingsManager.settings.AppleLanguages[0] ||
        NativeModules.SettingsManager.settings.AppleLocale
      : NativeModules.I18nManager.localeIdentifier 
  const [appState, setAppState] = useState(initState);
  const [screen, setScreen] = useState("login");

  useEffect(() => {
    getCookies();
  }, [])

  let getCookies = async () => {
    let email = await getCookie("email");
    let password = await getCookie("password");
    if (email && password) loginWithEmailPassword(email, password);
    let fullName = await getCookie("fullName");
    let uid = await getCookie("uid");
  
    setAppState({email: email, password: password, fullName: fullName, uid: uid});
    
}

  let saveCookie = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value).then();
    } catch (e) {
      console.log("Error storeData: " + e);
    }
  };

  let getCookie = async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.log("Error getData: " + e);
    }
  };

  let loginWithEmailPassword = (email, password) => {
    if (email && password) {
      logIn(email, password).then(response => {
        loginWithUid(response.user.uid);
        saveCookie("email", email);
        saveCookie("password", password);
        registerForPushNotificationsAsync(response.user) 
      }, e => {
        alert("Invalid E-mail and Password Combination!")
      })
    } else {
      alert("Please enter your E-Mail and Password!");
    }
  };

  let loginWithUid = (uid) => {
    let today = new Date();
    let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + "@" + today.getHours() + 
    ":" + today.getMinutes();
    storeObjectInDatabase(uid, {
      lastInteraction: date,
      deviceLanguage: deviceLanguage
    });
    getUserInfo(uid).on("value", (snapshot) => {
      saveCookie("fullName", snapshot.val().fullName)
      saveCookie("uid", uid)
      setScreen("homepage")
      //setAppState({babyGender: snapshot.val().babyGender});
    });
  };

  let logout = () => {
    setScreen("login");
    saveCookie("email", "");
    saveCookie("password", "");
    saveCookie("uid", "");
    saveCookie("fullName", "");
  };


  let goBack = () => {
    if (screen === "setting")
      setScreen("homepage")
      if (screen === "forgotPassword")
      setScreen("login")
  };

 
    if (screen === "login") {
      return (
        <LogIn
          setScreen={setScreen}
          login={loginWithEmailPassword}
        />
      );
    } else if (screen === "signup") {
      try {
        return (
          <SignUp
            setScreen={setScreen}
            login={loginWithEmailPassword}
          />
        );
      } catch (err) {
        setScreen("login");
      }
    } else if (screen === "setting") {
      return (
        <SettingsScreen
          email={appState.email}
          password={appState.password}
          setScreen={setScreen}
          goBack={goBack}
          fullName={appState.fullName}
          logout={logout}
        />
      );
    } else if (screen === "forgotPassword") {
      return (
        <ForgotPasswordPage
          setScreen={setScreen}
          goBack={goBack}
        />
      );
    } else {
      return (
        <Homepage
          setScreen={setScreen}
          fullName={appState.fullName}
          logout={logout}
        />
      );
    }
  
}
