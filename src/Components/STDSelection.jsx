import React from "react";
import { TouchableHighlight, Text, View, ScrollView } from "react-native";
import appStyles from "./AppStyles";
import STDSelectionButton from "./STDSelectionButton";
import STD from "./STD";

export default function STDSelection(props) {
  let onPress = (std) => {
    props.setLowerPanelContent("STDInfo");
    props.setSTDToView(std);
  };
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", maxWidth: "100%" }}
    >
      {STD().map((std) => (
        <STDSelectionButton
          name={props.getLocalizedText(std.name)}
          onPress={() => onPress(std)}
        />
      ))}
    </ScrollView>
  );
}
