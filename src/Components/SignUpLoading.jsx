import {
  Image,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import appStyles from './AppStyles';
import dnaLoading from '../../assets/dna-loading.gif';
import translate from './getLocalizedText';

export default function SignUpLoading(props) {
  const [loadingText, setLoadingText] = useState(
    translate('registeringAccount')
  );
  const [color, setColor] = useState(appStyles.greyColor);

  useEffect(() => {
    setTimeout(() => {
      setLoadingText(translate('allSet'));
      setColor(appStyles.pinkColor);
      setTimeout(() => {
        props.signUpAndUploadData();
      }, 1000);
    }, 2000);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={appStyles.container}>
        <View
          style={{
            marginTop: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
          }}
        >
          <Image source={dnaLoading} style={{width: 250, height: 250}} />
          <Text style={{...appStyles.paragraphText, color}}>{loadingText}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
