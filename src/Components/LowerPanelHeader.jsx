import { Image, Text, TouchableHighlight, View } from "react-native";
import appStyles from "./AppStyles";
import React from "react";
import goBackImg from "../../assets/go-back-arrow.png";
import * as Haptics from "expo-haptics";
import GestureRecognizer from "react-native-swipe-gestures";

export default function LowerPanelHeader(props) {
  let onPress = () => {
    Haptics.selectionAsync().then();
    props.onPress();
  };
  let goBack = () => {
    Haptics.selectionAsync().then();
    props.goBack();
  };

  let getCurrentHeaderTitle = () => {
    if (props.lowerPanelContent === "findCare")
      return props.getLocalizedText("findCare");
    if (props.lowerPanelContent === "clinicInfo")
      return props.getLocalizedText("findCare");
    if (props.lowerPanelContent === "learn")
      return props.getLocalizedText("learn");
    if (props.lowerPanelContent === "STDSelection")
      return props.getLocalizedText("STDSelection");
    if (props.lowerPanelContent === "resources")
      return props.getLocalizedText("resources");
    if (props.lowerPanelContent === "STDInfo")
      return props.getLocalizedText("STDInfo");
    if (props.lowerPanelContent === "Appointment")
      return props.getLocalizedText("appointment");
    if (props.lowerPanelContent === "NewAppointment")
      return props.getLocalizedText("newAppointment");
    if (props.lowerPanelContent === "documents")
      return props.getLocalizedText("documents");
  };

  return (
    <GestureRecognizer //The clinics section is slow on the swipe, I suspect it is because of the amount of clinics it is loading
      onSwipeUp={() => props.setFullPanel(true)}
      onSwipeDown={() => props.setFullPanel(false)}
      config={{ velocityThreshold: 0.4, directionalOffsetThreshold: 100 }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          height: appStyles.win.height * 0.05,
          margin: "3%",
        }}
      >
        <TouchableHighlight
          onPress={goBack}
          underlayColor={"transparent"}
          style={{
            left: appStyles.win.width * 0.03,
            width: appStyles.win.width * 0.1,
          }}
        >
          <Image
            style={{
              height: appStyles.win.width * 0.06,
              width: appStyles.win.width * 0.06,
            }}
            source={goBackImg}
          />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={onPress}
          underlayColor={"transparent"}
          style={{ width: appStyles.win.width * 0.9 }}
        >
          <Text
            style={{
              ...appStyles.paragraphText,
              textAlign: "center",
              width: appStyles.win.width * 0.8,
            }}
          >
            {getCurrentHeaderTitle()}
          </Text>
        </TouchableHighlight>
      </View>
    </GestureRecognizer>
  );
}
