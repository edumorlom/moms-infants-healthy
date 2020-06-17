import {Text, TouchableHighlight} from "react-native";
import appStyles from "./AppStyles";
import React from "react";
import * as Haptics from "expo-haptics";
import {RFValue} from "react-native-responsive-fontsize";

export default function MultipleChoiceButton(props){

    let onPress = () => {
        Haptics.selectionAsync().then();
        props.onPress();
    };

    return (
        <TouchableHighlight
            underlayColor={appStyles.underlayColor}
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: props.selected ? appStyles.greyColor : 'white',
                height: appStyles.win.height * 0.11,
                width: appStyles.win.width * 0.24,
                margin: 20,
                borderRadius: appStyles.button.TouchableHighlight.borderRadius,
                ...appStyles.shadow
            }}
            onPress={onPress}>
            <Text style={{color: props.color, fontSize: RFValue(45)}}>{props.text}</Text>
        </TouchableHighlight>
    )
}