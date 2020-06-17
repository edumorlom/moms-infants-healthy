import {Image, Text, TouchableHighlight, View} from "react-native";
import appStyles, {borderRadius, greyColor, pinkColor, shadow} from "./AppStyles";
import React from "react";
import * as Haptics from "expo-haptics";



export default function ActionButton(props){

    let onPress = () => {
        Haptics.selectionAsync().then();
        props.onPress();
    };

    return (
        <TouchableHighlight style={{
            margin: 4,
            paddingLeft: 20,
            justifyContent: 'center',
            backgroundColor: 'white',
            ...shadow,
            height: appStyles.win.height * 0.11,
            width: appStyles.win.width * 0.95,
            borderRadius: borderRadius}}
                            underlayColor={appStyles.underlayColor}
                            onPress={onPress}>
            <View style={{             alignItems: 'center', flexDirection: 'row'}}>
                <Image style={{width: 40, height: 40, marginRight: 20}} source={props.icon} />
            <View>
                <Text style={{color: appStyles.blueColor, fontSize: appStyles.regularFontSize, fontWeight: 'bold'}}>{props.mainAction}</Text>
                <Text style={{color: appStyles.greyColor, fontSize: appStyles.regularFontSize}}>{props.subAction}</Text>
            </View>
            </View>
        </TouchableHighlight>
    )
}