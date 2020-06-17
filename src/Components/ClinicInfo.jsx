import {View, Linking, Text, ScrollView} from "react-native";
import React from "react";
import ClinicSelectionButton from "./ClinicSelectionButton";
import ActionButton from "./ActionButton";
import directionsArrow from '../../assets/directions-arrow.png'
import appStyles from './AppStyles'
import visitSiteIcon from '../../assets/safari-visit-site.png'
import callIcon from '../../assets/call-icon.png'


export default function ClinicInfo(props){

    let getDirections = () => {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${props.clinic.coordinate.latitude},${props.clinic.coordinate.longitude}`;
        const label = 'Custom Label';
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });
        Linking.openURL(url);
    };


    let call = () => {
        Linking.openURL('tel:' + props.clinic.phoneNumber)
    };

    let visitSite = () => {
        Linking.openURL('http://' + props.clinic.website)
    };

    let services = props.clinic.services.map((service, key) => <Text key={key} style={{...appStyles.regularFontSize}}>{service}</Text>);


    return (
        <ScrollView contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}>
                <ClinicSelectionButton clinic={props.clinic} icon={directionsArrow} onPress={getDirections}/>
                <ActionButton mainAction={props.getLocalizedText("visitSite")} subAction={props.clinic.website.split('/')[0]} onPress={visitSite} icon={visitSiteIcon}/>
                <ActionButton mainAction={props.getLocalizedText("callClinic")} subAction={props.clinic.phoneNumber} onPress={call} icon={callIcon}/>
                <View style={{alignItems: 'center', marginTop: '5%', marginBottom: 11}}>
                    <Text style={{...appStyles.paragraphText, justifyContent: 'center', color: 'black'}}>{props.getLocalizedText("services")}</Text>
                        {services}
                </View>
        </ScrollView>
    )
}