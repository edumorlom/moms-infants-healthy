import React from "react";
import { TouchableHighlight, Text, View, ScrollView, Button } from "react-native";
import appStyles from "./AppStyles";
import BetterMenu from "./BetterMenu";
import translate from "./getLocalizedText";
import FemaleCondomStep from "./FemaleCondomStep"


export default function FemaleCondomSteps(props) {
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", maxWidth: "100%" }}
    >
      <Text
        style={{
          fontSize: appStyles.regularFontSize + 1,
          justifyContent: "center",
          color: appStyles.blueColor,
          fontWeight: "bold",
          textAlign: 'center',
          paddingBottom: 15
        }}>
        {translate("FemaleCondomHowTo")}</Text>

      {FemaleCondomStep().map((fcs, key) => (
        <BetterMenu
          style={appStyles.FemaleCondomMenuImage}
          key={key}
          text={translate(fcs.step)}
          icon={fcs.icon}
        />
      ))}

    </ScrollView>
  );
}
