import {Image, Text, TouchableHighlight, View} from "react-native";
import appStyles, {borderRadius, greyColor, shadow} from "./AppStyles";
import React from "react";
import * as Haptics from "expo-haptics";


export default function SelectionButton(props){

    let onPress = () => {
        Haptics.selectionAsync().then();
        props.onPress();
    };

    return (
        <TouchableHighlight style={{
            margin: appStyles.win.height * 0.009,
            backgroundColor: 'white',
            ...shadow,
            height: appStyles.win.height * 0.15,
            width: '85%',
            borderColor: greyColor,
            borderRadius: borderRadius}}
                            underlayColor={appStyles.underlayColor}
                            onPress={onPress}>
            <View style={{flexDirection: 'row',
                height: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginLeft: '14%'}}>
                <Image style={{width: appStyles.win.height * 0.07, height: appStyles.win.height * 0.07, marginRight: appStyles.win.width * 0.105}} source={props.icon} />
                <Text style={{color: props.color, fontSize: appStyles.regularFontSize, fontWeight: 'bold'}}>{props.text}</Text>
            </View>
        </TouchableHighlight>
    )
}