import {Image, Linking, Text, TouchableHighlight, View} from "react-native";
import appStyles from "./AppStyles";
import sosImage from "../../assets/sos-ambulance.png";
import React from "react";
import * as Haptics from "expo-haptics";
import {RFValue} from "react-native-responsive-fontsize";

export default function SOSButton() {

    let onPress = () => {
        Haptics.selectionAsync().then();
        Linking.openURL('tel:911')
    };

    return(
        <TouchableHighlight style={{
            position: 'absolute',
            right: '2%',
            top: '2%',
            width: '13%',
            flexDirection: 'row-reverse',
            marginTop: 30
        }} onPress={onPress}>
            <View style={appStyles.WhitePanelButton}>
                <Image style={{width: 25, height: 25,  marginLeft: 'auto', marginRight: 'auto'}} source={sosImage} />
                {/*<Text style={{color: appStyles.pinkColor, fontSize: RFValue(20), fontWeight: 'bold'}}>S.O.S</Text>*/}
            </View>
        </TouchableHighlight>
    )
}
