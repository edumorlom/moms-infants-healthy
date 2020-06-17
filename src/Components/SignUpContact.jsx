import React, { useState, useEffect } from "react";
import { AsyncStorage, Keyboard, Text, TextInput as TextBox, TouchableOpacity, View } from 'react-native';
import appStyles from './AppStyles';
import Button from "./Button";



export default SignUpInfo = (props) => {

     const [email, setEmail] = useState('');
     const [phone, setPhone] = useState('');

    
     useEffect(() => {
        AsyncStorage.getItem('e-mail').then((value) => {
            value !== null && value !== '' ? setEmail(value) : null;
        }).done();
        AsyncStorage.getItem('phone').then((value) => {
            value !== null && value !== '' ? setPhone(value) : null;
        }).done();
    
    }, []);

    let isValidEmail = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    let isValidPhoneNumber = (phoneNumber) => {
        return phoneNumber.length === 10 && !isNaN(phoneNumber) || phoneNumber.length === 12 && !isNaN(phoneNumber.substring(1, 12));

    };

    let onPress = () => {
        if (!email || !phone) {
            alert(props.getLocalizedText("fillOutAllFields"))
        } else if (!isValidEmail(email)){
            alert(props.getLocalizedText("invalidEmail"))
        } else if (!isValidPhoneNumber(phone)) {
            alert(props.getLocalizedText("invalidPhoneNumber"))
        } else {
            props.setUserInfo({email: email});
            props.setUserInfo({phoneNumber: phone});
            AsyncStorage.setItem('e-mail', email);
            AsyncStorage.setItem('phone', phone);
            props.getNextScreen();
        }
    };

    return (
        <TouchableOpacity onPress={Keyboard.dismiss} accessible={false} style={appStyles.container}>
            <View style={appStyles.container}>
                <View style={{
                    paddingTop: appStyles.win.height * 0.1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                }}>
                    <View>
                        <Text style={appStyles.titleBlue}>{props.getLocalizedText("contactInformation")}</Text>
                    </View>
                    <View style={{paddingTop: appStyles.win.height * 0.1}}>
                        <TextBox placeholder={props.getLocalizedText("emailInput")} onChangeText={setEmail} value= {email} style={appStyles.TextInputMask}/>
                        <TextBox placeholder={props.getLocalizedText("phoneNumberInput")} onChangeText={setPhone} keyboardType={"numeric"} value= {phone} style={appStyles.TextInputMask}/>

                    </View>
                </View>
                <View style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: '12%'
                }}>
                    <Button text={props.getLocalizedText("continueButton")} onPress={onPress}/>
                </View>
            </View>
        </TouchableOpacity>
    );
}

