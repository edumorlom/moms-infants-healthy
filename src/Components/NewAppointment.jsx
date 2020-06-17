import {
  Keyboard,
  Text,
  TouchableOpacity,
  TextInput as TextBox,
  View,
  AsyncStorage,
} from "react-native";
import React from "react";
import appStyles from "./AppStyles";
import Button from "./Button";
import TextInput from "./TextInput.jsx";

export default class NewAppointment extends React.Component {
  state = { name: "", address: "", date: "", time: "", reason: "" };

  setName = (name) => {
    this.setState({ name: name });
  };
  setAddress = (address) => {
    this.setState({ address: address });
  };
  setDate = (date) => {
    this.setState({ date: date });
  };
  setTime = (time) => {
    this.setState({ time: time });
  };
  setReason = (reason) => {
    this.setState({ reason: reason });
  };

  onPress = () => {
    if (
      !this.state.name ||
      !this.state.address ||
      !this.state.date ||
      !this.state.time
    ) {
      alert(this.props.getLocalizedText("fillOutAllFields"));
    } else {
      this.props.setAppointmentInfo({
        name: this.state.name,
        address: this.state.address,
        date: this.state.date,
        time: this.state.time,
        reason: this.state.reason,
      });
      //this.props.getNextScreen();
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
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
          }}
        >
          <View>
            <View style={appStyles.TextInput.View}>
              <TextBox
                placeholder={this.props.getLocalizedText("appointmentName")}
                onChangeText={this.setName}
                value={this.state.name}
                style={appStyles.TextInput.TextInput}
              />
            </View>
            <View style={appStyles.TextInput.View}>
              <TextBox
                placeholder={this.props.getLocalizedText("appointmentAddress")}
                onChangeText={this.setAddress}
                value={this.state.address}
                style={appStyles.TextInput.TextInput}
              />
            </View>
            <View style={appStyles.TextInput.View}>
              <TextBox
                placeholder={this.props.getLocalizedText("appointmentDate")}
                onChangeText={this.setDate}
                value={this.state.date}
                style={appStyles.TextInput.TextInput}
              />
            </View>
            <View style={appStyles.TextInput.View}>
              <TextBox
                placeholder={this.props.getLocalizedText("appointmentTime")}
                onChangeText={this.setTime}
                value={this.state.time}
                style={appStyles.TextInput.TextInput}
              />
            </View>
            <View style={appStyles.TextInput.View}>
              <TextBox
                placeholder={this.props.getLocalizedText("appointmentReason")}
                onChangeText={this.setReason}
                value={this.state.reason}
                style={appStyles.TextInput.TextInput}
              />
            </View>
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
