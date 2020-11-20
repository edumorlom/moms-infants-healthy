import React from "react";
import { TouchableHighlight, Text, View, ScrollView } from "react-native";
import appStyles from "./AppStyles";
import SelectionButton from "./SelectionButton";
import STDAwareness from "../../assets/std-awareness.png";
import translate from "./getLocalizedText";
import FemaleCondom from "../../assets/FC.png";


export default function learn(props) {
  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}
    >
      <SelectionButton
        style={appStyles.ImageOnRightSelectionButton}
        text={translate("STDAwareness")}
        subtext={translate("learnSTDs")}
        icon={STDAwareness}
        onPress={() => {
          props.setLowerPanelContent('STDSelection');
        }}
      />
      <SelectionButton
        style={appStyles.ImageOnRightSelectionButton}
        text={translate('ProtectedSex')}
        subtext={translate('FemaleCondomSubtext')}
        icon={FemaleCondom}
        onPress={() => {
          props.setLowerPanelContent('FemaleCondom');
        }}
      />
    </ScrollView>
  );
}
