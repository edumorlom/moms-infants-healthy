import React, { useState } from 'react';
import { Text, View, TextInput as TextBox } from 'react-native';
import goBackImg from "../../assets/go-back-arrow.png";
import appStyles from "./AppStyles";
import BackButton from "./Button"
import * as Haptics from "expo-haptics";
import { passwordReset } from '../Firebase';
import translate from "./getLocalizedText";
import Button from './Button';


const ForgotPasswordPage = (props) => {
    
    const [email, setEmail] = useState(null);

    onChangeText = (object) => {
        setEmail(object);
      };

    goBack = () => {
        Haptics.selectionAsync().then();
        props.goBack();
      };

    isValidEmail = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    PasswordReset = async (email) => {
        await Haptics.selectionAsync();

        try {
            if(!isValidEmail(email)){
                return alert("Invalid Email: Please input Valid Email");
            }
            await passwordReset(email);
            alert("Password Reset email sent Successfully!!\n Check your email ");
            console.log("Password Reset email sent Successfully!")
            props.setScreen('login');
            
        } catch (error) {
            alert("Sorry something went wrong Unsuccessful.");
            console.log(error);
        }

       
    }

        return (
            <View style={{flex: 1}}>
                <BackButton
                style={appStyles.BackButton } 
                icon={goBackImg}
                onPress= {goBack}
                />
                <View>
                    <Text 
                        style={{
                        color: appStyles.pinkColor,
                        fontSize: appStyles.titleFontSize,
                        fontWeight: 'bold',
                        alignSelf: 'center'
                        }}>{translate("forgotPassword")}</Text>
                </View>

                <View style={{marginTop: appStyles.win.height * 0.1, alignItems: 'center'}}>
                    <Text style={appStyles.titleBlue}>{translate("emailInput")}:</Text>
                    <View style={appStyles.TextInput.View}>
                        <TextBox
                        placeholder={translate("emailInput")}
                        style={appStyles.TextInput.TextInput}
                        value={email}
                        onChangeText={(e)=> onChangeText(e)}
                        />
                    </View>

                    
                    <Button style = {appStyles.button} text={translate("send")} onPress={() => PasswordReset(email)}/>
                </View>
            </View>
        )
    
}


export default ForgotPasswordPage;