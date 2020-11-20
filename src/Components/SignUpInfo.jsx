import React, {useState, useEffect} from 'react';
import {
  AsyncStorage,
  Keyboard,
  Text,
  TextInput as TextBox,
  TouchableOpacity,
  View,
  TouchableHighlight,
  KeyboardAvoidingView
} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import appStyles from './AppStyles';
import Button from './Button';
import translate from './getLocalizedText';

export default function SignUpInfo(props) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('name')
      .then((value) => {
        value !== null && value !== '' ? setName(value) : null;
      })
      .done();
    AsyncStorage.getItem('dob')
      .then((value) => {
        value !== null && value !== '' ? setDob(value) : null;
      })
      .done();
  }, []);

  let onPress = () => {
    if (!name || !dob) {
      alert(translate('fillOutAllFields'));
    } else if (!isValidDate(dob)) {
      alert(translate('invalidDate'));
    } else {
      props.setUserInfo({fullName: name});
      props.setUserInfo({dob});
      AsyncStorage.setItem('name', name);
      AsyncStorage.setItem('dob', dob);
      props.getNextScreen();
    }
  };

  let isValidDate = (date) => {
    let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    return regex.test(date);
  };

  let titleText = name ? translate('cool') : translate('greatToMeetYou');

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={appStyles.container}
    >
    <TouchableHighlight
      onPress={Keyboard.dismiss}
      underlayColor="transparent"
      accessible={false}
    >
      <>
        <View style={appStyles.container}>
          <Text style={appStyles.titleBlue}>
            {titleText}

            <Text style={appStyles.titlePink}>
              {name ? name.split(' ')[0] : ''}
            </Text>
          </Text>
          <View style={{paddingTop: appStyles.win.height * 0.1}}>
            <TextBox
              placeholder={translate('fullName')}
              onChangeText={(text) => setName(text)}
              value={name}
              style={appStyles.TextInputMask}
            />
            <TextInputMask
              placeholder={translate('dob')}
              type="datetime"
              options={{
                format: 'MM/DD/YYYY',
                validator(value, settings) {
                  let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
                  return regex.test(value);
                }, // validator function is read by isValid(), still to be used
              }}
              style={appStyles.TextInputMask}
              value={dob}
              onChangeText={(text) => setDob(text)}
              // ref={(ref) => motherDOB = ref}
            />
          </View>
          <View
            style={{
                width: '100%',
                alignItems: 'center',
                paddingTop: '10%'
            }}
            >
            <Button
                style={appStyles.button}
                text={translate('continueButton')}
                onPress={onPress}
            />
            </View>
        </View>  
      </>
    </TouchableHighlight>
    </KeyboardAvoidingView>
  );
}
