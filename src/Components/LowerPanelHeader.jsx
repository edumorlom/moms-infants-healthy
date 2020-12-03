import {Image, Text, TouchableHighlight, View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Haptics from 'expo-haptics';
import GestureRecognizer from 'react-native-swipe-gestures';
import appStyles from './AppStyles';
import goBackImg from '../../assets/go-back-arrow.png';
import BackButton from './Button';
import Button from './Button';
import filterButton from '../../assets/Filter.png';
import translate from './getLocalizedText';

// This component is the header for the lowerPanel
// It holds the backButton and the panelName
export default function LowerPanelHeader(props) {
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    let content = props.lowerPanelContent;
    // Check if the lowerPanelContent should have a fullscreen lower Panel
    if (
      ![
        'findCare',
        'shelters',
        'clinicInfo',
        'shelterInfo',
        'selection',
        'facilities',
      ].includes(content)
    ) {
      props.setFullScreen(true);
      props.setIsFullScreen(true);
      setFullScreen(true);
    }
    return () => {
      props.setFullScreen(false);
      props.setIsFullScreen(false);
    };
  }, []);

  let onPress = () => {
    Haptics.selectionAsync().then();
    props.onPress();
  };
  let goBack = () => {
    Haptics.selectionAsync().then();
    props.goBack();
  };

  let getCurrentHeaderTitle = () => {
    let content = props.lowerPanelContent;

    switch (content) {
      case 'findCare':
        return translate(content);
      case 'shelters':
        return translate(content);
      case 'clinicInfo':
        return translate('findCare');
      case 'shelterInfo':
        return translate('shelters');
      case 'learn':
        return translate(content);
      case 'STDSelection':
        return translate(content);
      case 'resources':
        return translate(content);
      case 'STDInfo':
        return translate(content);
      case 'Appointment':
        return translate('appointment');
      case 'NewAppointment':
        return translate('newAppointment');
      case 'documents':
        return translate(content);
      case 'FemaleCondom':
        return translate('FemaleCondom');
      case 'ReferenceNames':
        return translate('NameReference');
      case 'AddReferenceNames':
        return translate('AddNameReference');
      case 'facilities':
        return translate(content);
      default:
        throw new Error('That is not one of the state elements in SignUp');
    }
  };

  return (
    <GestureRecognizer
      onSwipeUp={() => props.setFullPanel(true)}
      onSwipeDown={() => props.setFullPanel(false)}
      config={{velocityThreshold: 0.4, directionalOffsetThreshold: 100}}
    >
      <>
        {fullScreen ? ( // Some padding on top when in fullScreen mode
          <Text style={{height: appStyles.win.height * 0.03}}> </Text>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: appStyles.win.height * 0.05,
            margin: '3%',
          }}
        >
          <BackButton
            style={backButton}
            icon={goBackImg}
            underlayColor="transparent"
            onPress={goBack}
          />
          <Button
            style={HeaderTitle}
            text={getCurrentHeaderTitle()}
            underlayColor="transparent"
            onPress={onPress}
          />
          {props.lowerPanelContent === 'findCare' ? (
            <Button
              style={FilterButton}
              icon={filterButton}
              underlayColor="transparent"
              onPress={props.setFilterToShow}
            />
          ) : (
            <Text style={{width: appStyles.win.width * 0.15}}>
              {/* This Text component is used to fill space */}
            </Text>
          )}
        </View>
      </>
    </GestureRecognizer>
  );
}

// Styles
const backButton = StyleSheet.create({
  Touchable: {
    left: appStyles.win.width * 0.025,
    width: appStyles.win.width * 0.15,
    height: appStyles.win.height * 0.02,
  },
  Image: {
    height: appStyles.win.width * 0.06,
    width: appStyles.win.width * 0.06,
  },
});

const HeaderTitle = StyleSheet.create({
  Touchable: {
    width: appStyles.win.width * 0.7,
    height: appStyles.win.width * 0.08,
  },
  Text: {
    ...appStyles.paragraphText,
    textAlign: 'center',
    width: appStyles.win.width * 0.7,
  },
});

const FilterButton = StyleSheet.create({
  Touchable: {
    width: appStyles.win.width * 0.15,
    height: appStyles.win.width * 0.08,
  },
  Image: {
    left: appStyles.win.width * 0.008,
    height: appStyles.win.width * 0.085,
    width: appStyles.win.width * 0.085,
  },
});
