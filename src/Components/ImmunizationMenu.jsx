import {
  Text,
  TouchableHighlight,
  View,
  Alert,
  DatePickerAndroid,
} from 'react-native';
import React from 'react';
import {Feather} from '@expo/vector-icons';
import appStyles, {borderRadius, shadow} from './AppStyles';
import translate from './getLocalizedText';

export default function ImmunizationMenu(props) {
  const {type, date, notes} = props.immunizations?.val();

  AsyncAlert = () => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        translate('RemoveImmunization'),
        translate('WantToRemoveImmunization'),
        [
          {text: translate('Yes'), onPress: () => resolve(true)},
          {text: translate('No'), onPress: () => resolve(false)},
        ],
        {cancelable: false}
      );
    });
  };

  return (
    <TouchableHighlight
      style={{
        margin: 15,
        paddingLeft: 10,
        justifyContent: 'center',
        backgroundColor: 'white',
        ...shadow,
        width: appStyles.win.width * 0.95,
        borderRadius,
      }}
      underlayColor={appStyles.underlayColor}
    >
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}
      >
        <View>
          <Text
            style={{
              color: appStyles.blueColor,
              fontSize: appStyles.regularFontSize + 7,
              fontWeight: 'bold',
            }}
          >
            {type}
          </Text>
          <Text
            style={{
              color: appStyles.greyColor,
              fontSize: appStyles.regularFontSize - 3,
            }}
          >
            {date}
          </Text>
          <Text
            style={{
              color: appStyles.greyColor,
              fontSize: appStyles.regularFontSize - 3,
            }}
          >
            {notes}
          </Text>
        </View>
        <TouchableHighlight
          style={{
            position: 'absolute',
            right: appStyles.win.width * 0.05,
            bottom: appStyles.win.height * 0.07,
          }}
          underlayColor="transparent"
          onPress={() => {
            AsyncAlert().then((response) => {
              response
                ? props.removeImmunization(props.immunizations?.key)
                : null;
            });
          }}
        >
          <Feather name="trash" size={40} color="#eb1800" />
        </TouchableHighlight>
      </View>
    </TouchableHighlight>
  );
}
