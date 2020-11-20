import {Image, Text, View} from 'react-native';
import React from 'react';
import appStyles from './AppStyles';
import miamiImage from '../../assets/palm-tree-beach.png';
import Button from './Button';
import translate from './getLocalizedText';

export default function MustLiveInMiami(props) {
  return (
    <View duration={1000} style={appStyles.container}>
      <View
        style={{
          paddingTop: appStyles.win.height * 0.1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
        }}
      >
        <Text style={appStyles.titleBlack}>{translate('pleaseNote')}</Text>
        <View style={{padding: '8%'}}>
          <Image
            style={{width: appStyles.win.width, height: 175}}
            source={miamiImage}
          />
        </View>
        <View style={{width: appStyles.win.width * 0.8}}>
          <Text style={{...appStyles.paragraphText, textAlign: 'center'}}>
            {translate('someFeaturesOnlyMiami')}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: '12%',
        }}
      >
        <Button
          style={appStyles.button}
          text={translate('iUnderstandButton')}
          onPress={() => props.getNextScreen()}
        />
      </View>
    </View>
  );
}
