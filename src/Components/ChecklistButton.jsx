import {Image, Text, TouchableHighlight, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import * as Haptics from 'expo-haptics';
import {getCookie, saveCookie} from './Cookies';
import appStyles, {borderRadius, greyColor, shadow} from './AppStyles';
import redX from '../../assets/redX.jpg';
import checkmark from '../../assets/checkmark.jpg';

// Very similar to Button.jsx but it has a specific functionality
// it displays the buttons in the lowerPanel (e.g. Clinics and Shelters)
export default function ChecklistButton(props) {
  const STORAGE_KEY = '@save_check';
  const [check, setCheck] = useState('');

  useEffect(() => {
    // Gets the cookie if it exists.
    getCookie(STORAGE_KEY).then((response) => {
      setCheck(response);
    });
  }, []);

  const onPress = () => {
    /* So the onPress wasn't working as intended so I removed it for now. 
       If you press an item, check it, move back, and come back to checklist, there's a weird bug
       where all items are checked even though only one is checked. Until it is fixed, it just displays
       stuff


    // Convert check to opposite string.
    // If true, then ''. If '', then true.
    const newCheck = check ? '' : 'true';
    // set the state
    setCheck(newCheck);
    // save the new cookie
    saveCookie(STORAGE_KEY, newCheck);
    */
    alert(
      "Supposed to remember the users' checked item, but currently isn't working"
    );
  };

  let showText = () => {
    return (
      <View>
        <Text style={props.style.Text}>{props.text}</Text>
        {props.style.Subtext && ( // If it has subtext, display it
          <Text style={props.style.Subtext}>{props.subtext}</Text>
        )}
      </View>
    );
  };

  let showImage = () => {
    return <Image style={props.style.Image} source={check && checkmark} />;
  };

  let showImageInView = () => {
    return (
      <Image style={props.style.ImageInView} source={check && checkmark} />
    );
  };

  return (
    <TouchableHighlight
      underlayColor={appStyles.underlayColor}
      onPress={() => onPress()}
      style={props.style.Touchable}
    >
      <>
        <View style={props.style.View}>
          {props.style.Image && showImage()}
          {props.style.Text && showText()}
        </View>
        {props.style.ImageView && (
          <View style={props.style.ImageView}>{showImageInView()}</View>
        )}
      </>
    </TouchableHighlight>
  );
}
