import { Image, Linking, Text, TouchableHighlight, View } from "react-native";
import appStyles, { borderRadius, greyColor, shadow } from "./AppStyles";
import React from "react";
import * as Haptics from "expo-haptics";

export default function STDSelectionButton(props) {
  let onPress = () => {
    Haptics.selectionAsync().then();
    props.onPress();
  };
  return (
    <TouchableHighlight
      underlayColor={appStyles.underlayColor}
      onPress={onPress}
      style={{
        margin: 5,
        padding: 20,
        backgroundColor: "white",
        ...shadow,
        minHeight: appStyles.win.height * 0.002,
        maxHeight: appStyles.win.height * 0.08,
        width: appStyles.win.width * 0.8,
        borderColor: greyColor,
        borderRadius: borderRadius,
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <React.Fragment>
        <View style={{ height: "100%", width: "90%", marginRight: 50 }}>
          <Text
            style={{
              color: appStyles.blueColor,
              fontSize: appStyles.regularFontSize,
              fontWeight: "bold",
            }}
          >
            {props.name}
          </Text>
        </View>
      </React.Fragment>
    </TouchableHighlight>
  );
}
