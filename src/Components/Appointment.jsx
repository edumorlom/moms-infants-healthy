import React from "react";
import { ScrollView, View, StyleSheet, Button } from "react-native";
import AppointmentMenu from "./AppointmentMenu";
import NewAppointment from "./NewAppointment";

export default class Appointment extends React.Component {
  state = { name: "", address: "", date: "", time: "", reason: "" };
  constructor(props) {
    super(props);
  }
  newAppointmentButton = (
    <AppointmentMenu name={this.props.getLocalizedText("appointment")} />
  );
  setAppointmentInfo = (keyToValue) => {
    this.setState({ keyToValue: keyToValue });
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ alignItems: "flex-end", maxWidth: "100%" }}
      >
        <View>
          <Button
            title={this.props.getLocalizedText("wantNewAppointment")}
            onPress={() => {
              this.props.setLowerPanelContent("NewAppointment");
            }}
          />
        </View>
        {this.newAppointmentButton}
      </ScrollView>
    );
  }
}
