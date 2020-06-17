import {Text, TouchableHighlight, View, Alert} from "react-native";
import appStyles from "./AppStyles";
import * as Haptics from "expo-haptics";
import React from 'react';

export default class WelcomeUserBanner extends React.Component {

    constructor(props) {
        super(props);
        //console.log(props);
        
    }

    state = {text: `${this.props.getLocalizedText('welcomeUserBanner')} ${this.props.fullName ? this.props.fullName.split(' ')[0] : ''}`};

    // AsyncAlert = () => {
    //     return new Promise((resolve, reject) => {
    //         Alert.alert(
    //             'Log Out',
    //             'Are you sure you want to log out of this account?',
    //             [
    //                 {text: 'YES', onPress: () => resolve(true) },
    //                 {text: 'NO', onPress: () => resolve(false) }
    //             ],
    //             { cancelable: false }
    //         )
    //     })
    // } 

    render() {
        
        return (
            
            <TouchableHighlight style={appStyles.WelcomeUserBanner.TouchableHighlight}
                                underlayColor={appStyles.pinkColor}
                                onPress={
                                    () => {
                                    }
                                }>
                <Text style={{
                    color: "white",
                    fontSize: appStyles.regularFontSize,
                    fontWeight: 'bold'
                }}>
                    {this.state.text}</Text>
            </TouchableHighlight>
        )
    }
}