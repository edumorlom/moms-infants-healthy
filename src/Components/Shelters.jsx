import React, {useState, useEffect} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown-v2';
import SelectionButton from './SelectionButton';
import shelterLogo from '../../assets/shelter-logo.png';
import appStyles, {borderRadius, greyColor, shadow} from './AppStyles';

export default function Shelters(props) {
  let getResourceName = (name) => {
    return name.length > 40 ? `${name.substring(0, 40)}...` : name;
  };

  let window = appStyles.win;

  let shelterButtons = props.shelters.map((shelter, key) => (
    <SelectionButton
      style={appStyles.ClinicSelectionButton}
      key={key}
      text={getResourceName(shelter.resource)}
      subtext={`${shelter.address.street}\n${shelter.address.city}\n${shelter.address.state}, ${shelter.address.zipCode}`}
      icon={shelterLogo}
      onPress={() => {
        props.setShelterToView(shelter);
        props.setLowerPanelContent('shelterInfo');
      }}
    />
  ));

  return (
    <>
      <ScrollView
        contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}
      >
        {shelterButtons}
      </ScrollView>
    </>
  );
}
