import React from 'react';
import {TouchableHighlight, Text, View, ScrollView} from 'react-native';
import appStyles from './AppStyles';
import Menu from './Menu';
import STD from './STD';
import translate from './getLocalizedText';

export default function STDInfo({route}) {
  const {name} = route.params;
  const {symptoms} = route.params;
  const {diagnosis} = route.params;
  const {treatment} = route.params;
  const {consequences} = route.params;
  const {safeSex} = route.params;

  return (
    <View style={appStyles.contentContainer}>
      <ScrollView>
        <Menu title={translate('symptoms')} info={translate(symptoms)} />
        <Menu title={translate('testing')} info={translate(diagnosis)} />
        <Menu title={translate('treatment')} info={translate(treatment)} />
        <Menu
          title={translate('consequences')}
          info={translate(consequences)}
        />
        <Menu title={translate('safeSex')} info={translate(safeSex)} />
      </ScrollView>
    </View>
  );
}
