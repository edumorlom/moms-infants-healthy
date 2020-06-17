import {Image, Text, View, TouchableOpacity} from "react-native";
import appStyles from "./AppStyles";
import filterImage from "../../assets/delete-filter.png";
import React from "react";
import * as Haptics from "expo-haptics";
import {RFValue} from "react-native-responsive-fontsize";

export default function CancelFilterButton(props) {

    let onPress = () => {
        Haptics.selectionAsync().then();
        props.resetFilters();
    };

    return(
        <TouchableOpacity  style={{position: 'absolute', right: '2%', top: '2%', width: '13%', flexDirection: 'row-reverse', marginTop: 30}}
                onPress={onPress}>
            <View style={appStyles.WhitePanelButton}>
                <Image style={{width: 25, height: 25,  marginLeft: 'auto', marginRight: 'auto'}} source={filterImage} />
            </View>
        </TouchableOpacity>
    )
}

