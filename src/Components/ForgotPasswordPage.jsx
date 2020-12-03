import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput as TextBox,
  TouchableHighlight,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import goBackImg from '../../assets/go-back-arrow.png';
import appStyles from './AppStyles';
import BackButton from './Button';
import {passwordReset} from '../Firebase';
import translate from './getLocalizedText';
import Button from './Button';

const ForgotPasswordPage = (props) => {
  const [email, setEmail] = useState(null);

  onChangeText = (object) => {
    setEmail(object);
  };

  goBack = () => {
    Haptics.selectionAsync().then();
    props.goBack();
  };

  isValidEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  PasswordReset = async (email) => {
    await Haptics.selectionAsync();

    try {
      if (!isValidEmail(email)) {
        return alert('Invalid Email: Please input Valid Email');
      }
      await passwordReset(email);
      alert('Password Reset email sent Successfully!!\n Check your email ');
      console.log('Password Reset email sent Successfully!');
      props.navigation.navigate('LogIn');
    } catch (error) {
      alert('Sorry something went wrong Unsuccessful.');
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={appStyles.signupContainer}
      enabled={false}
    >
      <TouchableHighlight
        onPress={Keyboard.dismiss}
        accessible={false}
        underlayColor="transparent"
      >
        <View style={appStyles.container}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          >
            <View style={appStyles.TextInput.View}>
              <TextBox
                placeholder={translate('emailInput')}
                style={appStyles.TextInput.TextInput}
                value={email}
                onChangeText={(e) => onChangeText(e)}
              />
            </View>
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              margin: '15%',
              justifyContent: 'center',
            }}
          >
            <Button
              style={appStyles.button}
              text={translate('resetPassword')}
              onPress={() => PasswordReset(email)}
            />
          </View>
        </View>
      </TouchableHighlight>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordPage;
