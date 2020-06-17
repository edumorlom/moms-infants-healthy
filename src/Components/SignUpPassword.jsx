import React, { useEffect, useState } from "react";
import { AsyncStorage, Keyboard, Text, TextInput as TextBox, TouchableOpacity, View } from 'react-native';
import appStyles from './AppStyles';
import Button from "./Button";


export default SignUpPassword = (props) => {

    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');
    
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
            alert(props.getLocalizedText("passwordMismatch"))
        } else if (!password || !repeat) {
            alert(props.getLocalizedText("fillOutAllFields"))
        } else if (password.length < 6){
            alert(props.getLocalizedText("passwordTooShort"))
        } else {
            props.setUserInfo({password: password});
            AsyncStorage.setItem('pass', password);
            AsyncStorage.setItem('repeat', repeat);
            props.getNextScreen();
        }
    };
        return (
            <TouchableOpacity onPress={Keyboard.dismiss} accessible={false} style={appStyles.container}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                    }}>
                        <Text style={appStyles.titleBlue}>{props.getLocalizedText("createPassword")}</Text>
                        <View style={{paddingTop: appStyles.win.height * 0.1}}>
                            
                            <TextBox placeholder={props.getLocalizedText("passwordInput")} onChangeText={setPassword} secureTextEntry={true} value= {password} style={appStyles.TextInputMask}/>
                        
                            <TextBox placeholder={props.getLocalizedText("repeatPasswordInput")} onChangeText={setRepeat} secureTextEntry={true} value= {repeat} style={appStyles.TextInputMask}/>
                            
                        </View>
                    </View>
                    <View style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: '12%',}}>
                        <Button text={props.getLocalizedText("continueButton")} onPress={onPress}/>
                    </View>
            </TouchableOpacity>
        );
    }
