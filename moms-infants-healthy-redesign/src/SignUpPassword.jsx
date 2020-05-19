import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import appStyles from "./AppStyles";
import Button from "./Button";
import TextInput from "./TextInput.jsx";

export default class SignUpPassword extends React.Component {
  state = { password: "", repeatPassword: "" };

  setPassword = (password) => {
    this.setState({ password: password });
  };

  setRepeatPassword = (password) => {
    this.setState({ repeatPassword: password });
  };

  onPress = () => {
    if (this.state.password !== this.state.repeatPassword) {
      alert(this.props.getLocalizedText("passwordMismatch"));
    } else if (!this.state.password || !this.state.repeatPassword) {
      alert(this.props.getLocalizedText("fillOutAllFields"));
    } else if (this.state.password.length < 6) {
      alert(this.props.getLocalizedText("passwordTooShort"));
    } else {
      this.props.setUserInfo(this.state);
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
        <View
          style={{
            paddingTop: appStyles.win.height * 0.1,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
          }}
        >
          <Text style={appStyles.titleBlue}>
            {this.props.getLocalizedText("createPassword")}
          </Text>
          <View style={{ paddingTop: appStyles.win.height * 0.1 }}>
            <TextInput
              type={"password"}
              placeholder={this.props.getLocalizedText("passwordInput")}
              onChangeText={this.setPassword}
            />
            <TextInput
              type={"password"}
              placeholder={this.props.getLocalizedText("repeatPasswordInput")}
              onChangeText={this.setRepeatPassword}
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
            onPress={this.onPress}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
