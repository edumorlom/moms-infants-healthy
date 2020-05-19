import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import appStyles from "./AppStyles";
import Button from "./Button";
import TextInput from "./TextInput.jsx";

export default class SignUpInfo extends React.Component {
  state = { fullName: "", dob: "" };

  setFullName = (fullName) => {
    this.setState({ fullName: fullName });
  };

  setDob = (dob) => {
    this.setState({ dob: dob });
  };

  onPress = () => {
    if (!this.state.fullName || !this.state.dob) {
      alert(this.props.getLocalizedText("fillOutAllFields"));
    } else if (!this.isValidDate(this.state.dob)) {
      alert(this.props.getLocalizedText("invalidDate"));
    } else {
      this.props.setUserInfo({
        fullName: this.state.fullName,
        dob: this.state.dob,
      });
      this.props.getNextScreen();
    }
  };

  isValidDate = (date) => {
    let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    return regex.test(date);
  };

  render() {
    let titleText = this.state.fullName
      ? this.props.getLocalizedText("cool")
      : this.props.getLocalizedText("greatToMeetYou");
    return (
      <TouchableOpacity
        onPress={Keyboard.dismiss}
        accessible={false}
        style={appStyles.container}
      >
        <View
          style={{
            paddingTop: appStyles.win.height * 0.1,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
          }}
        >
          <Text style={appStyles.titleBlue}>
            {titleText}
            <Text style={appStyles.titlePink}>
              {this.state.fullName ? this.state.fullName.split(" ")[0] : ""}
            </Text>
            !
          </Text>
          <View style={{ paddingTop: appStyles.win.height * 0.1 }}>
            <TextInput
              placeholder={this.props.getLocalizedText("fullName")}
              onChangeText={this.setFullName}
            />
            <TextInput
              placeholder={this.props.getLocalizedText("dob")}
              type={"date"}
              onChangeText={this.setDob}
              keyboardType={"numeric"}
            />
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
            text={this.props.getLocalizedText("continueButton")}
            onPress={() => this.onPress()}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
