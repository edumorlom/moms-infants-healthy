import React from 'react';
import {
  View,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useState} from 'react';
import appStyles from './AppStyles';
import translate from './getLocalizedText';
import Button from './Button';
import {getUid, addReference} from '../Firebase';

function AddReferenceNames(props) {
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [specialties, setSpecialties] = useState(null);
  const uid = getUid();

  referenceInfo = {
    name,
    phone,
    email,
    specialties,
  };

  onPress = async () => {
    if (!name || !phone || !email || !specialties) {
      alert(translate('fillOutAllFields'));
    } else if (!isValidEmail(email)) {
      return alert('Invalid Email: Please input Valid Email');
    } else {
      await addReference(uid, referenceInfo);
      props.navigation.navigate('ReferenceNames');
    }
  };

  isValidEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <Pressable style={appStyles.contentContainer} onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={appStyles.signupContainer}
        enabled={false}
      >
        <View style={appStyles.TextInput.View}>
          <TextInput
            placeholder={translate('referenceName')}
            onChangeText={setName}
            value={name}
            style={appStyles.TextInput.TextInput}
          />
        </View>
        <View style={appStyles.TextInput.View}>
          <TextInput
            placeholder={translate('MedicalSpecialties')}
            onChangeText={setSpecialties}
            value={specialties}
            style={appStyles.TextInput.TextInput}
          />
        </View>
        <View style={appStyles.TextInput.View}>
          <TextInput
            placeholder={translate('referencePhone')}
            onChangeText={setPhone}
            keyboardType="numeric"
            value={phone}
            style={appStyles.TextInput.TextInput}
          />
        </View>
        <View style={appStyles.TextInput.View}>
          <TextInput
            placeholder={translate('referenceEmail')}
            onChangeText={setEmail}
            value={email}
            style={appStyles.TextInput.TextInput}
          />
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: appStyles.win.height * 0.05,
          }}
        >
          <Button
            style={appStyles.button}
            text={translate('save')}
            onPress={onPress}
          />
        </View>
      </KeyboardAvoidingView>
    </Pressable>
  );
}

export default AddReferenceNames;
