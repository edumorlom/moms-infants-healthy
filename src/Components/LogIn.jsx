import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Animated,
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Keyboard,
  TextInput as TextBox,
  Text,
  StyleSheet,
  AsyncStorage,
  NativeModules,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import appStyles from './AppStyles';
import Button from './Button';
// import TextInput from "./TextInput";
import SwipeUp from './SwipeUp';
import background from '../../assets/background.gif';
import loginMainImage from '../../assets/child.png';
import translate from './getLocalizedText';
import {} from 'react-native';
import {
  logIn,
  registerForPushNotificationsAsync,
  storeObjectInDatabase,
  getUserInfo,
} from '../Firebase';
// import ForgotPasswordPage from './ForgotPasswordPage';

export default LogIn = (props) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [fadeValue, setFadeValue] = useState(new Animated.Value(0));

  // Remove async tasks on unMount using _isMounted

  useEffect(() => {
    _start();
  }, []);

  let _start = () => {
    Animated.timing(fadeValue, {
      toValue: 1,
      useNativeDriver: false,
      duration: 2000,
    }).start();
  };

  const initState = {
    uid: '',
    email: '',
    password: '',
    fullName: '' /* babyGender: "", */,
  };
  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLanguages[0] ||
        NativeModules.SettingsManager.settings.AppleLocale
      : NativeModules.I18nManager.localeIdentifier;
  const [appState, setAppState] = useState(initState);
  const [screen, setScreen] = useState('login');

  useEffect(() => {
    getCookies();
  }, []);

  let getCookies = async () => {
    let email = await getCookie('email');
    let password = await getCookie('password');
    if (email && password) loginWithEmailPassword(email, password);
    let fullName = await getCookie('fullName');
    let uid = await getCookie('uid');

    setAppState({
      email,
      password,
      fullName,
      uid,
    });
  };

  let saveCookie = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value).then();
    } catch (e) {
      console.log(`Error storeData: ${e}`);
    }
  };

  let getCookie = async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.log(`Error getData: ${e}`);
    }
  };

  let loginWithEmailPassword = (email, password) => {
    if (email && password) {
      logIn(email, password).then(
        (response) => {
          loginWithUid(response.user.uid);
          saveCookie('email', email);
          saveCookie('password', password);
          registerForPushNotificationsAsync(response.user);
        },
        (e) => {
          alert('Invalid E-mail and Password Combination!');
        }
      );
    } else {
      alert('Please enter your E-Mail and Password!');
    }
  };

  let loginWithUid = (uid) => {
    let today = new Date();
    let date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}@${today.getHours()}:${today.getMinutes()}`;
    storeObjectInDatabase(uid, {
      lastInteraction: date,
      deviceLanguage,
    });
    getUserInfo(uid).on('value', (snapshot) => {
      saveCookie('fullName', snapshot.val().fullName);
      saveCookie('uid', uid);
    });
    props.navigation.navigate('Homepage');
  };

  return (
    <>
      <Animated.View
        style={{opacity: fadeValue, height: '100%', width: '100%'}}
      >
        <TouchableHighlight
          onPress={Keyboard.dismiss}
          underlayColor="transparent"
          accessible={false}
        >
          <>
            {/* }
            <ImageBackground
              source={background}
              style={{
                position: 'absolute',
                opacity: 0.75,
                width: appStyles.win.width,
                height: appStyles.win.height,
              }}
            />
            */}
            <View
              style={{
                paddingTop: appStyles.win.height * 0.05,
                alignItems: 'center',
              }}
            >
              <Image
                style={{
                  width: appStyles.win.height * 0.17,
                  height: appStyles.win.height * 0.17,
                  margin: appStyles.win.height * 0.02,
                }}
                source={loginMainImage}
              />
              <TextBox
                style={appStyles.TextInputMask}
                placeholder={translate('emailInput')}
                onChangeText={setEmail}
              />
              <TextBox
                style={appStyles.TextInputMask}
                placeholder={translate('passwordInput')}
                onChangeText={setPassword}
                secureTextEntry
              />
              <View style={{height: appStyles.win.height * 0.03}} />
              <Button
                style={appStyles.button}
                onPress={() => {
                  loginWithEmailPassword(email, password);
                }}
                text={translate('signInButton')}
              />
              <Button
                style={forgotPassword}
                text={translate('forgotPassword')}
                onPress={() => props.navigation.navigate('TestingScreen')}
              />
            </View>
          </>
        </TouchableHighlight>
        <View
          style={{
            paddingTop: appStyles.win.height * 0.075,
            alignItems: 'center',
          }}
        >
          <SwipeUp
            text={translate('swipeUpToSignUp')}
            onSwipeUp={() => props.navigation.navigate('LetsGetStarted')}
          />
        </View>
      </Animated.View>
    </>
  );
};

const forgotPassword = StyleSheet.create({
  Text: {
    paddingTop: 20,
    color: 'white',
    fontWeight: '500',
  },
});
