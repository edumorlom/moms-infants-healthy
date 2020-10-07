import React, { useEffect, useRef, useState } from "react";
import { Keyboard, Text, TouchableOpacity, View, AsyncStorage, TouchableHighlight, } from "react-native";
import appStyles from "./AppStyles";
import Button from "./Button";
import { TextInputMask } from "react-native-masked-text";
import translate from "./getLocalizedText";

export default SignUpBabyDob = (props) => {

  const [babyDob, setBabyDob] = useState('');

  const babyDOB = useRef(null);
    
    useEffect(() => {
        AsyncStorage.getItem('babyDOB').then((value) => {
            value !== null && value !== '' ? setBabyDob(value) : null;
        }).done();
    
    }, [])

  let setDob = (babyDOB) => {
    setBabyDob(babyDOB);
    AsyncStorage.setItem("babyDOB", babyDOB);
  };

  let onPress = () => {
    if (!babyDob) {
      alert(translate("fillOutAllFields"));
    } else if (!isValidDate(babyDob)) {
      alert(translate("invalidDate"));
    } else {
      props.setUserInfo({ babyDOB: babyDob }); 
      props.getNextScreen();
    }
  };

  let isValidDate = (date) => {
    let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    return regex.test(date);
  };

  
let titletext = translate("babydob");

    return (
      <TouchableHighlight
        style={appStyles.container}
        underlayColor={"transparent"}
        onPress={Keyboard.dismiss}
        accessible={false}
      >
      <>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
          }}
        >
          <Text style={appStyles.titleBlue}>{titletext}</Text>
          <View style={{ paddingTop: appStyles.win.height * 0.1 }}>
            <TextInputMask
              placeholder={translate("dob")}
              type={"datetime"}
              options={{
                format: "MM/DD/YYYY",
                validator: function (value, settings) {
                  let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
                  return regex.test(value);
                }, //This validator function is read by isValid(), still to be used
              }}
              style={appStyles.TextInputMask}
              value={babyDob}
              onChangeText={setDob}
              // ref={(ref) => (babyDOB = ref)}
            />
            {/* <TextInput placeholder={translate("dob")} type={'date'} onChangeText={setDob} keyboardType={"numeric"} dob = {"baby"}/> */}
          </View>
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: "12%",
          }}
        >
          <Button
            style = {appStyles.button}
            text={translate("continueButton")}
            onPress={onPress}
          />
        </View>
      </>
      </TouchableHighlight>
    );
  
}
