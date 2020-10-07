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
    StyleSheet
} from 'react-native';
import React, { useState, useEffect } from "react";
import appStyles from "./AppStyles";
import Button from "./Button";
//import TextInput from "./TextInput";
import SwipeUp from "./SwipeUp";
import background from "../../assets/background.gif";
import loginMainImage from "../../assets/child.png";
import translate from "./getLocalizedText";
import ForgotPasswordPage from './ForgotPasswordPage';

export default LogIn = props => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [fadeValue, setFadeValue] = useState(new Animated.Value(0));

  //Remove async tasks on unMount using _isMounted

  useEffect(() => {
    _start();
  }, [])

  

    let _start = () => {
        Animated.timing(fadeValue, {
            toValue: 1,
            useNativeDriver: true,
            duration: 2000
        }).start();
    };

  
        return (
            <>
                <Animated.View style={{opacity: fadeValue, height: '100%', width: '100%'}}>
                    <TouchableHighlight onPress={Keyboard.dismiss} underlayColor={"transparent"} accessible={false}>
                    <>
                    <ImageBackground source={background} style={{position: 'absolute', opacity: 0.75, width: appStyles.win.width, height: appStyles.win.height}}/>

                    <View style={{paddingTop: appStyles.win.height * 0.05, alignItems: 'center'}}>
                        <Image style={{width: appStyles.win.height * 0.17, height: appStyles.win.height * 0.17, margin: appStyles.win.height * 0.02}} source={loginMainImage}/>
                        <TextBox style={appStyles.TextInputMask} placeholder={translate('emailInput')} onChangeText={setEmail}/>
                        <TextBox  style={appStyles.TextInputMask} placeholder={translate('passwordInput')} onChangeText={setPassword} secureTextEntry={true}/>
                        <View style={{height: appStyles.win.height * 0.03}}/>
                        <Button style = {appStyles.button} onPress={() => props.login(email, password)} text={translate('signInButton')}/>
                        <Button style={forgotPassword} text= {translate("forgotPassword")} onPress={() => props.setScreen('forgotPassword')} />
                    </View>
                    </>
                    </TouchableHighlight>
                </Animated.View>
                <SwipeUp text={translate('swipeUpToSignUp')}
                         onSwipeUp={() => props.setScreen('signup')}/>
            </>

  
    );
    
  
}

const forgotPassword = StyleSheet.create({
    Text: { 
        paddingTop: 20, 
        color: 'white', 
        fontWeight: '500'
    }
  });
