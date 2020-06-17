import React from "react";
import {
  TouchableHighlight,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import babyBottle from "../../assets/baby-bottle.png";
import clinicLogo from "../../assets/clinic-logo.png";
import lightBulb from "../../assets/light-bulb.png";
import document from "../../assets/document.png";
import WelcomeUserBanner from "./WelcomeUserBanner";
import SelectionButton from "./SelectionButton";
import GestureRecognizer from "react-native-swipe-gestures";
import { MaterialIcons } from "@expo/vector-icons";

export default function LowerPanelSelection(props) {
  return (
    <GestureRecognizer
      onSwipeUp={() => props.setFullPanel(true)}
      onSwipeDown={() => props.setFullPanel(false)}
      config={{ velocityThreshold: 0.4, directionalOffsetThreshold: 100 }}
      style={{ width: "100%", height: "100%", alignItems: "center" }}
    >
      <TouchableHighlight
        onPress={() => props.setFullPanel(true)}
        underlayColor={"transparent"}
        style={{ height: "10%", width: "100%" }}
      >
        <Text></Text>
      </TouchableHighlight>
      <WelcomeUserBanner
        fullName={props.fullName}
        logout={props.logout}
        getLocalizedText={props.getLocalizedText}
      />
      <View>
        <MaterialIcons
          name="settings"
          size={45}
          style={styles.userSettingStyle}
          onPress={() => props.setAppState({ screen: "setting" })}
        />
      </View>
      <SelectionButton
        text={props.getLocalizedText("findCare")}
        icon={clinicLogo}
        onPress={() => props.setLowerPanelContent("findCare")}
      />
      <SelectionButton
        text={props.getLocalizedText("learn")}
        icon={babyBottle}
        onPress={() => {
          props.setLowerPanelContent("learn");
        }}
      />
      <SelectionButton
        text={props.getLocalizedText("resources")}
        icon={lightBulb}
        onPress={() => {
          props.setLowerPanelContent("resources");
        }}
      />
      <SelectionButton
        text={props.getLocalizedText("documents")}
        icon={document}
        onPress={() => {
          props.setLowerPanelContent("documents");
        }}
      />
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  userSettingStyle: {
    //  borderWidth: 1,
    //  borderColor: 'red',
    position: "absolute",
    left: 120,
    bottom: 25,
    color: '#706e6c'
    //  alignSelf: 'flex-start',
  },
});
