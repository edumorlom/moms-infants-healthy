import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import appStyles, {blueColor, pinkColor, shadow} from './AppStyles';
import MultipleChoiceButton from './Button';

export default SignUpYesorNo = (props) => {
  let onPress = (userResponse) => {
    props.setUserInfo({[props.value]: userResponse});
    props.getNextScreen();
  };

  return (
    <View style={appStyles.container}>
      <View
        style={{
          paddingTop: appStyles.win.height * 0.2,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
        }}
      >
        <Text
          style={{
            color: 'black',
            fontSize: appStyles.titleFontSize,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {props.question}
        </Text>
        <View style={appStyles.rowContainer}>
          <MultipleChoiceButton
            style={Blue}
            text="✓"
            onPress={() => onPress(true)}
          />
          <MultipleChoiceButton
            style={Pink}
            text="X"
            onPress={() => onPress(false)}
          />
        </View>
      </View>
    </View>
  );
};

const Touchable = StyleSheet.create({
  Touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    height: appStyles.win.height * 0.11,
    width: appStyles.win.width * 0.24,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: appStyles.button.Touchable.borderRadius,
    ...shadow,
  },
});

const Blue = StyleSheet.create({
  Touchable: {...Touchable.Touchable},
  Text: {
    color: blueColor,
    fontSize: RFValue(45),
  },
});

const Pink = StyleSheet.create({
  Touchable: {...Touchable.Touchable},
  Text: {
    color: pinkColor,
    fontSize: RFValue(45),
  },
});
