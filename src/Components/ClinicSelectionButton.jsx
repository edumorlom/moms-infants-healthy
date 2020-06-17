import {Image, Text, TouchableHighlight, View} from "react-native";
import appStyles, {borderRadius, greyColor, shadow} from "./AppStyles";
import React from "react";
import * as Haptics from "expo-haptics";



export default function ClinicSelectionButton(props){

    let onPress = () => {
        Haptics.selectionAsync().then();
        props.onPress();
    };

    let resourceName = props.clinic.resource.length > 40 ? props.clinic.resource.substring(0, 40)  + '...': props.clinic.resource;
    return (
        <TouchableHighlight underlayColor={appStyles.underlayColor}
                            onPress={onPress}
                            style={{
                                margin: 5,
                                padding: 20,
                                backgroundColor: 'white',
                                ...shadow,
                                minHeight: appStyles.win.height * 0.2,
                                maxHeight: appStyles.win.height * 0.3,
                                width: appStyles.win.width * 0.95,
                                borderColor: greyColor,
                                borderRadius: borderRadius,
                                alignItems: 'center',
                                flexDirection: 'row'}}>
            <React.Fragment>
                <View style={{height: '100%', width: '80%'}}>
                    <Text style={{color: appStyles.blueColor, fontSize: appStyles.regularFontSize, fontWeight: 'bold'}}>{resourceName}</Text>
                    <Text style={{color: appStyles.greyColor, fontSize: appStyles.regularFontSize}}>{props.clinic.address.street}</Text>
                    <Text style={{color: appStyles.greyColor, fontSize: appStyles.regularFontSize}}>{`${props.clinic.address.city}`}</Text>
                    <Text style={{color: appStyles.greyColor, fontSize: appStyles.regularFontSize}}>{`${props.clinic.address.state}, ${props.clinic.address.zipCode}`}</Text>
                    <Text style={{color: appStyles.greyColor, fontSize: appStyles.regularFontSize}}>{`${props.clinic.distance} miles`}</Text>

                </View>
                <View style={{height: '100%', width: '7%', justifyContent: 'center'}}>
                    <Image style={{width: 40, height: 40}} source={props.icon} />
                </View>
            </React.Fragment>
        </TouchableHighlight>
    )
}