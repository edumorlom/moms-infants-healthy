import {Image, Text} from 'react-native';
import React from 'react';
import * as Haptics from 'expo-haptics';
import GestureRecognizer from 'react-native-swipe-gestures';
import appStyles from './AppStyles';
import swipeUpGif from '../../assets/swipe-up-arrow.gif';

export default function SwipeUp(props) {
  let onSwipeUp = () => {
    Haptics.selectionAsync().then();
    props.onSwipeUp();
  };

  return (
    <GestureRecognizer
      onSwipeUp={() => onSwipeUp()}
      config={{velocityThreshold: 0.4, directionalOffsetThreshold: 100}}
      style={{
        width: appStyles.win.width,
        paddingTop: appStyles.win.height * 0.2,
        bottom: '15%',
        alignItems: 'center',
      }}
    >
      <Image style={{width: 30, height: 30, margin: 8}} source={swipeUpGif} />
      <Text
        style={{
          ...appStyles.paragraphText,
          color: appStyles.blueColor,
          textAlign: 'center',
        }}
      >
        {props.text}
      </Text>
    </GestureRecognizer>
  );
}
