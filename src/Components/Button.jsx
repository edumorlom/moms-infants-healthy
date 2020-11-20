import {Text, TouchableHighlight, View, Image} from 'react-native';
import React from 'react';
import * as Haptics from 'expo-haptics';
import appStyles from './AppStyles';

/* Depending on the props.style passed to this component, it will output a completely different button
so by manipulating the props.style you can design the button you want without having to create a new Component */
export default function Button(props) {
  let onPress = () => {
    Haptics.selectionAsync().then();
    props.onPress();
  };

  // This function runs if there is a View property engulfing text or image
  // Note that if you have View you can't also have Image
  // You would need to have ImageInView (for consistency)
  let withView = () => {
    return (
      <View style={props.style.View}>
        {props.style.Image && (
          <Image style={props.style.Image} source={props.icon} />
        )}
        {props.style.TextView && (
          <View style={props.style.TextView}>
            {props.style.TextInView && (
              <Text style={props.style.TextInView}>{props.text}</Text>
            )}
            {props.style.SubtextInView && (
              <Text style={props.style.SubtextInView}>{props.subtext}</Text>
            )}
          </View>
        )}
      </View>
    );
  };
  // If Text property exists
  let showText = () => {
    return <Text style={props.style.Text}>{props.text}</Text>;
  };

  // If Subtext property exists
  let showSubtext = () => {
    return <Text style={props.style.Subtext}>{props.subtext}</Text>;
  };

  // If Image property exists
  let showImage = () => {
    return <Image style={props.style.Image} source={props.icon} />;
  };

  let underlayColor = props.underlayColor
    ? props.underlayColor
    : appStyles.underlayColor;

  return (
    <TouchableHighlight
      // props.style.Touchable && props.style.Touchable means that if style.Touchable exists pass it to the Touchable style, otherwise pass nothing
      style={props.style.Touchable && props.style.Touchable}
      onPress={onPress}
      underlayColor={
        props.style.underlayColor ? props.style.underlayColor : underlayColor
      }
    >
      <>
        {/* Calls the function conditionally note the && operator evaluates the right side
                only if the left side is truthy (a js term) */}
        {props.style.View && withView()}
        {props.style.Text && showText()}
        {props.style.Subtext && showSubtext()}
        {/* Image without View */}
        {props.style.Image && !props.style.View && showImage()}
      </>
    </TouchableHighlight>
  );
}
