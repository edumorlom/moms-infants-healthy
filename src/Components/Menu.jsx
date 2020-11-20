import {Image, Text, TouchableHighlight, View} from 'react-native';
import React from 'react';
import * as Haptics from 'expo-haptics';
import appStyles, {
  borderRadius,
  greyColor,
  pinkColor,
  shadow,
} from './AppStyles';

export default function Menu(props) {
  let onPress = () => {
    Haptics.selectionAsync().then();
    props.onPress();
  };

  return (
    <TouchableHighlight
      style={{
        margin: 10,
        paddingLeft: 10,
        justifyContent: 'center',
        backgroundColor: 'white',
        ...shadow,
        top: 15,
        bottom: 15,
        width: appStyles.win.width * 0.95,
        borderRadius,
      }}
      underlayColor={appStyles.underlayColor}
    >
      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        <View>
          <Text
            style={{
              color: appStyles.blueColor,
              fontSize: appStyles.regularFontSize,
              fontWeight: 'bold',
            }}
          >
            {props.title}
          </Text>
          <Text
            style={{
              color: appStyles.greyColor,
              fontSize: appStyles.regularFontSize - 5,
            }}
          >
            {props.info}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              // height: '100%',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginLeft: '14%',
            }}
          >
            <Image
              style={{
                width: appStyles.win.height * 0.07,
                height: appStyles.win.height * 0.07,
                marginRight: appStyles.win.width * 0.105,
              }}
              source={props.icon}
            />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}
