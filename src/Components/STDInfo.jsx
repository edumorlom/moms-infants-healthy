import React from "react";
import { TouchableHighlight, Text, View, ScrollView } from "react-native";
import appStyles from "./AppStyles";
import STDMenu from "./STDMenu";
import STD from "./STD";

export default function STDInfo(props) {
  console.log(props.STDToView);
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", maxWidth: "100%" }}
    >
      <STDMenu
        title={props.getLocalizedText("symptoms")}
        info={props.getLocalizedText(props.STDToView.symptoms)}
      />
      <STDMenu
        title={props.getLocalizedText("testing")}
        info={props.getLocalizedText(props.STDToView.diagnosis)}
      />
      <STDMenu
        title={props.getLocalizedText("treatment")}
        info={props.getLocalizedText(props.STDToView.treatment)}
      />
      <STDMenu
        title={props.getLocalizedText("consequences")}
        info={props.getLocalizedText(props.STDToView.consequences)}
      />
      <STDMenu
        title={props.getLocalizedText("safeSex")}
        info={props.getLocalizedText(props.STDToView.safeSex)}
      />
    </ScrollView>
  );
}
