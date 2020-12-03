import {View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';

export default function TesterScreen() {
  return (
    <View style={{flex: 1}}>
      <View style={{height: 200, backgroundColor: 'grey'}} />
      <View
        style={{
          height: 200,
          flexGrow: 1,
          backgroundColor: 'black',
          alignItems: 'center',
        }}
      />
    </View>
  );
}
