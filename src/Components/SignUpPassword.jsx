import React, { useEffect, useState } from "react";
import { AsyncStorage, Keyboard, Text, TextInput as TextBox, TouchableOpacity, View, TouchableHighlight } from 'react-native';
import appStyles from './AppStyles';
import Button from "./Button";
import translate from "./getLocalizedText";

export default SignUpPassword = (props) => {

    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');
    //Sets the default message to tell the user to type a password 
    const [passwordLength, setPasswordLength] = useState('Type a password.')
    //Sets the default password 
    const [passwordColor, setPasswordColor] = useState('black')
    
    
    useEffect(() => {
        AsyncStorage.getItem('pass').then((value) => {
            value !== null && value !== '' ? setPassword(value) : null;
        }).done();
        AsyncStorage.getItem('repeat').then((value) => {
            value !== null && value !== '' ? setRepeat(value) : null;
        }).done();  
    }, [])

    let onPress = () => {
        if (password !== repeat) {
            alert(translate("passwordMismatch"))
        } else if (!password || !repeat) {
            alert(translate("fillOutAllFields"))
        } else if (password.length < 6){
            alert(translate("passwordTooShort"))
        } else if (password == "password" || password == "qwerty"){
            alert("Make your password original to avoid your account from being stolen")
        } else {
            props.setUserInfo({password: password});
            AsyncStorage.setItem('pass', password);
            AsyncStorage.setItem('repeat', repeat);
            props.getNextScreen();
        }
    };
    const passwordChecker = (password) => {
        setPassword(password);
        //Set the message printed under the input textbox depending on the size of the password
        if (password.length >= 1 && password.length <= 4) setPasswordLength('Too easy.');
        else if (password.length >= 5 && password.length <= 9) setPasswordLength('Good.');
        else if (password.length >= 10 && password.length <= 14) setPasswordLength('Very Good.');
        else if (password.length >= 15) setPasswordLength('Excellent!');
        //Set the color printed under the input textbox depending on the size of the password
        if (password.length >= 1 && password.length <= 4) setPasswordColor('lightgreen');
        else if (password.length >= 5 && password.length <= 9) setPasswordColor('green');
        else if (password.length >= 10 && password.length<= 14) setPasswordColor('darkgreen');
        else if (password.length >= 15) setPasswordColor('blue');
    };
        return (
            <TouchableHighlight onPress={Keyboard.dismiss} underlayColor={"transparent"} accessible={false} style={appStyles.container}>
            <>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                    }}>
                        <Text style={appStyles.titleBlue}>{translate("createPassword")}</Text>
                        <View style={{paddingTop: appStyles.win.height * 0.1}}>
                            
                            <TextBox placeholder={translate("passwordInput")} onChangeText={passwordChecker} secureTextEntry={true} value= {password} style={appStyles.TextInputMask}/>                            
                            <TextBox placeholder={translate("repeatPasswordInput")} onChangeText={setRepeat} secureTextEntry={true} value= {repeat} style={appStyles.TextInputMask}/>
                            
                        </View>
                        <Text style={{color: passwordColor}}>{passwordLength}</Text>
                    </View>
                    <View style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: '12%',}}>
                        <Button style = {appStyles.button} text={translate("continueButton")} onPress={onPress}/>
                    </View>
            </>
            </TouchableHighlight>
        );
    }
