import { Text, View } from "react-native";
import React from "react";
import appStyles from "./AppStyles";
import MultipleChoiceButton from "./MultipleChoiceButton";

export default class SignUpYesorNo extends React.Component {
  onPress = (userResponse) => {
    this.props.setUserInfo({ [this.props.value]: userResponse });
    this.props.getNextScreen();
  };

  render() {
    return (
      <View style={appStyles.container}>
        <View
          style={{
            paddingTop: appStyles.win.height * 0.3,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: appStyles.titleFontSize,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {this.props.question}
          </Text>
          <View style={appStyles.rowContainer}>
            <MultipleChoiceButton
              text={"✓"}
              color={appStyles.blueColor}
              onPress={() => this.onPress(true)}
            />
            <MultipleChoiceButton
              text={"X"}
              color={appStyles.pinkColor}
              onPress={() => this.onPress(false)}
            />
          </View>
        </View>
      </View>
    );
  }
}
