import {View, Linking, Text, ScrollView} from 'react-native';
import React from 'react';
import SelectionButton from './SelectionButton';
import ActionButton from './Button';
import directionsArrow from '../../assets/directions-arrow.png';
import appStyles from './AppStyles';
import visitSiteIcon from '../../assets/safari-visit-site.png';
import callIcon from '../../assets/call-icon.png';
import translate from './getLocalizedText';

export default function ShelterInfo(props) {
  let getDirections = () => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${props.shelter.coordinate.latitude},${props.shelter.coordinate.longitude}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };

  let call = () => {
    Linking.openURL(`tel:${props.shelter.phoneNumber}`);
  };

  let visitSite = () => {
    Linking.openURL(props.shelter.website);
  };

  let getResourceName = (name) => {
    return name.length > 40 ? `${name.substring(0, 40)}...` : name;
  };

  console.log(props.shelter.website);

  let shelterInfo = `${props.shelter.address.street}\n${props.shelter.address.city}\n${props.shelter.address.state}, ${props.shelter.address.zipCode}`;

  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}
    >
      <SelectionButton
        style={appStyles.ClinicSelectionButton}
        text={getResourceName(props.shelter.resource)}
        subtext={`${shelterInfo}`}
        icon={directionsArrow}
        onPress={getDirections}
        /* clinic={props.shelter}  */
      />
      <ActionButton
        style={appStyles.ActionButton}
        text={translate('visitSite')}
        subtext={props.shelter.website.split('/')[2]} // Anything after https://
        onPress={visitSite}
        icon={visitSiteIcon}
      />
      <ActionButton
        style={appStyles.ActionButton}
        text={translate('callShelter')}
        subtext={props.shelter.phoneNumber}
        onPress={call}
        icon={callIcon}
      />
      <View style={{alignItems: 'center', marginTop: '5%', marginBottom: 11}}>
        <Text
          style={{
            ...appStyles.paragraphText,
            justifyContent: 'center',
            color: 'black',
          }}
        >
          {props.shelter.opened}
        </Text>
      </View>
    </ScrollView>
  );
}
