import React, { useState, useEffect } from "react";
import { AsyncStorage, Keyboard, Text, TextInput as TextBox, TouchableOpacity, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import appStyles from './AppStyles';
import Button from "./Button";

export default function SignUpInfo(props) {
    
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    
    useEffect(() => {
        AsyncStorage.getItem('name').then((value) => {
            value !== null && value !== '' ? setName(value) : null;
        }).done();
        AsyncStorage.getItem('dob').then((value) => {
            value !== null && value !== '' ? setDob(value) : null;
        }).done();
    
    }, [])

    
    let onPress = () => {
        if (!name || !dob) {
            alert(props.getLocalizedText("fillOutAllFields"))
        } else if (!isValidDate(dob)){
            alert(props.getLocalizedText("invalidDate"))
        } else {
            props.setUserInfo({fullName: name});
            props.setUserInfo({dob: dob});
            AsyncStorage.setItem('name', name);
            AsyncStorage.setItem('dob', dob);
            props.getNextScreen();
        }
    };

    let isValidDate = (date) => {
        let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
        return regex.test(date);
    };


    let titleText = name ? props.getLocalizedText("cool") : props.getLocalizedText("greatToMeetYou");


        return (
            <TouchableOpacity onPress={Keyboard.dismiss} accessible={false} style={appStyles.container}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                    }}>
                        <Text style={appStyles.titleBlue}>
                            {titleText}
            
                            <Text style={appStyles.titlePink}>
                                {name ? name.split(' ')[0] : ''}
                            </Text>
                            
                        </Text>
                        <View style={{paddingTop: appStyles.win.height * 0.1}}>
                            <TextBox placeholder={props.getLocalizedText("fullName")} onChangeText={text => setName(text)} value= {name} style={appStyles.TextInputMask}/>
                            <TextInputMask 
                                placeholder={props.getLocalizedText("dob")} 
                                type={'datetime'}
                                options={{
                                  format: 'MM/DD/YYYY',
                                  validator: function(value, settings) {
                                    let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
                                    return regex.test(value);
                                  }  //validator function is read by isValid(), still to be used
                                  
                                }} 
                                style={appStyles.TextInputMask}
                                value={dob}
                                onChangeText = {text => setDob(text)}
                                // ref={(ref) => motherDOB = ref}
                                />
                            
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
            </TouchableOpacity>
        );
    }

