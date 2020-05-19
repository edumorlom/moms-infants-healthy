import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import appStyles from "./AppStyles";
import Button from "./Button";
import TextInput from "./TextInput.jsx";

export default class SignUpInfo extends React.Component {
  state = { email: "", phoneNumber: "" };

  setEmail = (email) => {
    this.setState({ email: email });
  };

  setPhoneNumber = (phoneNumber) => {
    this.setState({ phoneNumber: phoneNumber });
  };

  isValidEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  isValidPhoneNumber = (phoneNumber) => {
    return (
      (phoneNumber.length === 10 && !isNaN(phoneNumber)) ||
      (phoneNumber.length === 12 && !isNaN(phoneNumber.substring(1, 12)))
    );
  };

  onPress = () => {
    if (!this.state.email || !this.state.phoneNumber) {
      alert(this.props.getLocalizedText("fillOutAllFields"));
    } else if (!this.isValidEmail(this.state.email)) {
      alert(this.props.getLocalizedText("invalidEmail"));
    } else if (!this.isValidPhoneNumber(this.state.phoneNumber)) {
      alert(this.props.getLocalizedText("invalidPhoneNumber"));
    } else {
      this.props.setUserInfo({
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
      });
      this.props.getNextScreen();
    }
  };

  render() {
    return (
      <TouchableOpacity
        onPress={Keyboard.dismiss}
        accessible={false}
        style={appStyles.container}
      >
        <View style={appStyles.container}>
          <View
            style={{
              paddingTop: appStyles.win.height * 0.1,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
            }}
          >
            <View>
              <Text style={appStyles.titleBlue}>
                {this.props.getLocalizedText("contactInformation")}
              </Text>
            </View>
            <View style={{ paddingTop: appStyles.win.height * 0.1 }}>
              <TextInput
                placeholder={this.props.getLocalizedText("emailInput")}
                onChangeText={this.setEmail}
              />
              <TextInput
                placeholder={this.props.getLocalizedText("phoneNumberInput")}
                onChangeText={this.setPhoneNumber}
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
        </View>
      </TouchableOpacity>
    );
  }
}
