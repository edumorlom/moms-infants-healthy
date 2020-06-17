import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image, TextInput as TextBox } from 'react-native';
import goBackImg from "../../assets/go-back-arrow.png";
import appStyles from "./AppStyles";
import * as Haptics from "expo-haptics";
import Firebase from './Firebase';



class ForgotPasswordPage extends Component {
    constructor(props){
        super(props);
        this.state ={
            email: null
        }

        this.onChangeText = this.onChangeText.bind(this);
    }

    onChangeText = (object) => {
        this.setState(object);
      };

    goBack = () => {
        Haptics.selectionAsync().then();
        this.props.goBack();
      };

    isValidEmail = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    PasswordReset = async (email) => {
        Haptics.selectionAsync().then();
        let fb = new Firebase();

        try {
            if(!this.isValidEmail(email)){
                return alert("Invalid Email: Please input Valid Email");
            }
            await fb.passwordReset(email);
            alert("Password Reset email sent Successfully!!\n Check your email ");
            console.log("Password Reset email sent Successfully!")
            this.props.setAppState({screen: 'login'});
            
        } catch (error) {
            alert("Sorry something went wrong Unsuccessful.");
            console.log(error);
        }

       
    }


    render() {
        const { email } = this.state;
        return (
            <View style={{flex: 1}}>
                <TouchableHighlight
                    onPress={this.goBack}
                    underlayColor={"transparent"}
                    style={{
                    height: appStyles.win.height * 0.04,
                    marginTop: "8%",
                    marginLeft: "3%",
                    marginBottom: '5%',
                    width: appStyles.win.width * 0.07,
                    }}
                >
                <Image
                    style={{
                        height: appStyles.win.width * 0.06,
                        width: appStyles.win.width * 0.06,
                    }}
                    source={goBackImg}/>
                </TouchableHighlight>
                <View>
                    <Text 
                        style={{
                        color: appStyles.pinkColor,
                        fontSize: appStyles.titleFontSize,
                        fontWeight: 'bold',
                        alignSelf: 'center'
                        }}>{this.props.getLocalizedText("forgotPassword")}</Text>
                </View>

                <View style={{marginTop: appStyles.win.height * 0.1, alignItems: 'center'}}>
                    <Text style={appStyles.titleBlue}>{this.props.getLocalizedText("emailInput")}:</Text>
                    <View style={appStyles.TextInput.View}>
                        <TextBox
                        placeholder={this.props.getLocalizedText("emailInput")}
                        style={appStyles.TextInput.TextInput}
                        value={email}
                        onChangeText={(e)=> this.onChangeText({email: e})}
                        />
                    </View>

                    <TouchableHighlight style={appStyles.button.TouchableHighlight} underlayColor={appStyles.blueColor}  
                    onPress={() => this.PasswordReset(email)} >
                    <Text style={appStyles.button.text}>{this.props.getLocalizedText("send")}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}


export default ForgotPasswordPage;