import {View, Linking, Text, ScrollView} from "react-native";
import React from "react";
import SelectionButton from "./SelectionButton";
import ActionButton from "./Button";
import directionsArrow from '../../assets/directions-arrow.png'
import appStyles from './AppStyles'
import visitSiteIcon from '../../assets/safari-visit-site.png'
import callIcon from '../../assets/call-icon.png'
import translate from "./getLocalizedText";

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

    let getResourceName = (name) => {
        return name.length > 40
        ? name.substring(0, 40) + "..."
        : name;
      }

    let services = props.clinic.services.map((service, key) => <Text key={key} style={{...appStyles.regularFontSize}}>{translate(service)}</Text>);

    let clinicInfo = props.clinic.address.street + '\n' + props.clinic.address.city + '\n' + props.clinic.address.state +', '+ props.clinic.address.zipCode + '\n' + props.clinic.distance + ' miles';


    return (
        <ScrollView contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}>
                <SelectionButton 
                    style={appStyles.ClinicSelectionButton}
                    text={getResourceName(props.clinic.resource)}
                    subtext={`${clinicInfo}`}
                    icon={directionsArrow} 
                    onPress={getDirections}
                    /* clinic={props.clinic}  */
                />
                <ActionButton 
                style={appStyles.ActionButton}
                text={translate("visitSite")} 
                subtext={props.clinic.website.split('/')[0]} 
                onPress={visitSite} 
                icon={visitSiteIcon}
                />
                <ActionButton 
                style={appStyles.ActionButton}
                text={translate("callClinic")} 
                subtext={props.clinic.phoneNumber} 
                onPress={call} 
                icon={callIcon}/>
                <View style={{alignItems: 'center', marginTop: '5%', marginBottom: 11}}>
                    <Text style={{...appStyles.paragraphText, justifyContent: 'center', color: 'black'}}>{translate("services")}</Text>
                        {services}
                </View>
        </ScrollView>
    )
}