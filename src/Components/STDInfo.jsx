import React from 'react';
import {TouchableHighlight, Text, View, ScrollView} from 'react-native';
import appStyles from './AppStyles';
import Menu from './Menu';
import STD from './STD';
import translate from './getLocalizedText';

export default function STDInfo(props) {
  console.log(props.STDToView);
  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}
    >
      <Menu
        title={translate('symptoms')}
        info={translate(props.STDToView.symptoms)}
      />
      <Menu
        title={translate('testing')}
        info={translate(props.STDToView.diagnosis)}
      />
      <Menu
        title={translate('treatment')}
        info={translate(props.STDToView.treatment)}
      />
      <Menu
        title={translate('consequences')}
        info={translate(props.STDToView.consequences)}
      />
      <Menu
        title={translate('safeSex')}
        info={translate(props.STDToView.safeSex)}
      />
    </ScrollView>
  );
}
