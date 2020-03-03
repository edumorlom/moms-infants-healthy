import {Text, TouchableHighlight, View} from "react-native";
import appStyles, {borderRadius, shadow} from "./AppStyles";
import * as Haptics from "expo-haptics";
import React from 'react';

export default function WelcomeUserBanner(props) {
    return (
        <View style={{
            width: '100%',
            backgroundColor: 'white'}}>
            <TouchableHighlight style={{
                backgroundColor: appStyles.blueColor,
                shadowColor: shadow.shadowColor,
                shadowOffset: appStyles.shadow.shadowOffset,
                shadowOpacity: appStyles.shadow.shadowOpacity,
                borderBottomRightRadius: borderRadius,
                justifyContent: 'center',
                borderTopRightRadius: borderRadius,
                flexDirection: 'row',
                marginRight: '30%',
                padding: '5%',
                marginBottom: '5%'
            }} onPress={() => {
                Haptics.selectionAsync().then();
                props.logout();
            }}>
                <Text style={{
                    color: "white",
                    fontSize: appStyles.regularFontSize,
                    fontWeight: 'bold',
                }}>{`Welcome${props.fullName ? ' ' + props.fullName.split(' ')[0] : ''}`}</Text>
            </TouchableHighlight>
        </View>
    )
}