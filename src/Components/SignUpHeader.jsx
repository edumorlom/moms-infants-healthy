import {Image, Text, TouchableHighlight, View} from "react-native";
import appStyles from "./AppStyles";
import React from "react";
import goBackImg from "../../assets/go-back.png";
import * as Haptics from "expo-haptics";

export default function SignUpHeader(props) {

    let goBack = () => {
        Haptics.selectionAsync().then();
        props.goBack();
    };

    let backgroundColor = "white";

    if (props.index === 8) {   //Only on baby gender page
        if (props.male && props.female) {
            backgroundColor = "#800080"
        } else if (props.male) {
            backgroundColor = appStyles.blueColor;
        } else if (props.female) {
            backgroundColor = appStyles.pinkColor
        }
    }   

    return (
        <View style = {{flexDirection: 'row', width: '100%', height: appStyles.win.height * 0.1, backgroundColor: backgroundColor}}>
                    <TouchableHighlight
                        onPress={goBack}
                        underlayColor={'transparent'}
                        style = {{
                            height: appStyles.win.height * 0.04,
                            marginTop: '12%',
                            marginLeft: '3%',
                            width:  appStyles.win.width * 0.07
                        }}
                         >
                
                
                   
                        <Image style={{height: appStyles.win.width * 0.06, width: appStyles.win.width * 0.06}} source={goBackImg}/>
                
                    </TouchableHighlight>
                </View>


    )



}