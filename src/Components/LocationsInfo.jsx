import {View, Linking, Text, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import SelectionButton from './SelectionButton';
import ActionButton from './Button';
import directionsArrow from '../../assets/directions-arrow.png';
import appStyles from './AppStyles';
import visitSiteIcon from '../../assets/safari-visit-site.png';
import callIcon from '../../assets/call-icon.png';
import translate from './getLocalizedText';
import LocationsMap from './LocationsMap';

export default function LocationsInfo({route}) {
  const {location} = route.params;

  let locationList = [location];

  let getDirections = () => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${location.coordinate.latitude},${location.coordinate.longitude}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };

  let call = () => {
    Linking.openURL(`tel:${location.phoneNumber}`);
  };

  let visitSite = () => {
    Linking.openURL(`http://${location.website}`);
  };

  let getResourceName = (name) => {
    return name.length > 40 ? `${name.substring(0, 40)}...` : name;
  };

  let locationInfo = `${location.address.street}\n${location.address.city}\n${location.address.state}, ${location.address.zipCode}\n${location.distance} miles`;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <View style={appStyles.container}>
        <LocationsMap locations={locationList} style={{}} index={-1} />
      </View>
      <View style={{height: 400}}>
        <ScrollView>
          <SelectionButton
            style={appStyles.ClinicSelectionButton}
            text={getResourceName(location.resource)}
            subtext={`${locationInfo}`}
            icon={directionsArrow}
            onPress={getDirections}
          />
          {console.log(location.website)}
          <ActionButton
            style={appStyles.ActionButton}
            text={translate('visitSite')}
            subtext={location.website.split('/', 3)}
            onPress={visitSite}
            icon={visitSiteIcon}
          />
          <ActionButton
            style={appStyles.ActionButton}
            text={translate('callClinic')}
            subtext={location.phoneNumber}
            onPress={call}
            icon={callIcon}
          />
        </ScrollView>
      </View>
    </View>
  );
}
