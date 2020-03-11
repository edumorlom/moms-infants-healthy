import {Image, Text, TouchableHighlight, View} from "react-native";
import appStyles, {borderRadius, greyColor, shadow} from "./AppStyles";
import React from "react";
import * as Haptics from "expo-haptics";



export default function ActionButton(props){

    let onPress = () => {
        Haptics.selectionAsync().then();
        props.onPress();
    };

    return (
        <TouchableHighlight style={{
            margin: 10,
            padding: 20,
            backgroundColor: 'white',
            ...shadow,
            height: appStyles.win.height * 0.16,
            minWidth: '95%',
            borderColor: greyColor,
            borderRadius: borderRadius,
            alignItems: 'center',
            flexDirection: 'row'}}
                            underlayColor={appStyles.greyColor}
                            onPress={onPress}>
            <View>
                <Text style={{color: appStyles.blueColor, fontSize: appStyles.regularFontSize, fontWeight: 'bold'}}>{props.mainAction}</Text>
                <Text style={{color: appStyles.greyColor, fontSize: appStyles.regularFontSize}}>{props.subAction}</Text>
            </View>
        </TouchableHighlight>
    )
}