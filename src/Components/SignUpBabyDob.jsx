import React, { useEffect, useRef, useState } from "react";
import { Keyboard, Text, TouchableOpacity, View, AsyncStorage, } from "react-native";
import appStyles from "./AppStyles";
import Button from "./Button";
import { TextInputMask } from "react-native-masked-text";

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
      alert(props.getLocalizedText("fillOutAllFields"));
    } else if (!isValidDate(babyDob)) {
      alert(props.getLocalizedText("invalidDate"));
    } else {
      props.setUserInfo({ babyDOB: babyDob }); 
      props.getNextScreen();
    }
  };

  let isValidDate = (date) => {
    let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    return regex.test(date);
  };

  
let titletext = props.getLocalizedText("babydob");

    return (
      <TouchableOpacity
        onPress={Keyboard.dismiss}
        accessible={false}
        style={appStyles.container}
      >
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
              placeholder={props.getLocalizedText("dob")}
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
            {/* <TextInput placeholder={props.getLocalizedText("dob")} type={'date'} onChangeText={setDob} keyboardType={"numeric"} dob = {"baby"}/> */}
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
            text={props.getLocalizedText("continueButton")}
            onPress={onPress}
          />
        </View>
      </TouchableOpacity>
    );
  
}
