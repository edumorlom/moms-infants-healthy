import {Image, Text, View, Animated} from 'react-native';
import React, {useState, useEffect} from 'react';
import ConfettiCannon from 'react-native-confetti-cannon';
import * as Haptics from 'expo-haptics';
import heartBalloon from '../../assets/heart-balloon.png';
import appStyles from './AppStyles';
import translate from './getLocalizedText';

export default LetsGetStarted = (props) => {
  const [fadeValue, setFadeValue] = useState(new Animated.Value(0));

  let _isMounted = false;

  useEffect(() => {
    _isMounted = true;
    _isMounted && confettiVibration();
    _isMounted && _start();
    _isMounted && setTimeout(() => props.getNextScreen(), 4000);

    return () => (_isMounted = false);
  }, []);

  let _start = () => {
    Animated.timing(fadeValue, {
      toValue: 1,
      useNativeDriver: false,
      duration: 1000,
    }).start();
  };

  let confettiVibration = async () => {
    await Haptics.selectionAsync();
    await Haptics.selectionAsync();
    await Haptics.selectionAsync();
    await Haptics.selectionAsync();
    await Haptics.selectionAsync();
    await Haptics.selectionAsync();
    await Haptics.selectionAsync();
    await Haptics.selectionAsync();
  };

  return (
    <Animated.View style={{opacity: fadeValue, ...appStyles.container}}>
      <ConfettiCannon
        count={150}
        origin={{x: -10, y: 0}}
        fallSpeed={2500}
        colors={[appStyles.blueColor, appStyles.pinkColor]}
      />
      <View
        style={{
          paddingTop: appStyles.win.height * 0.1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
        }}
      >
        <Text style={appStyles.titleBlue}>{translate('letsGetStarted')}</Text>
        <Image
          style={{
            margin: 100,
            width: appStyles.win.height * 0.15,
            height: appStyles.win.height * 0.15,
          }}
          source={heartBalloon}
        />
        <Text
          style={{
            ...appStyles.paragraphText,
            textAlign: 'center',
            paddingTop: 100,
            color: 'black',
          }}
        >
          {translate('parentingIsntEasy')}
        </Text>
        <Text style={{...appStyles.paragraphText, textAlign: 'center'}}>
          {translate('hereToHelp')}
        </Text>
      </View>
    </Animated.View>
  );
};
