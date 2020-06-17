import { Image, Text, TouchableHighlight, View } from "react-native";
import appStyles, { borderRadius, greyColor, shadow } from "./AppStyles";
import React from "react";
import * as Haptics from "expo-haptics";

export default function LearnSelectionButton(props) {
  let onPress = () => {
    Haptics.selectionAsync().then();
    props.onPress();
  };

  return (
    <TouchableHighlight
      style={{
        margin: appStyles.win.height * 0.009,
        backgroundColor: "white",
        ...shadow,
        height: appStyles.win.height * 0.15,
        width: "85%",
        borderColor: greyColor,
        borderRadius: borderRadius,
      }}
      underlayColor={appStyles.underlayColor}
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: "column",
          height: "100%",
          justifyContent: "flex-start",
          alignItems: "center",
          marginLeft: "5%",
        }}
      >
        <Image
          style={{
            width: appStyles.win.height * 0.06,
            height: appStyles.win.height * 0.06,
            marginRight: appStyles.win.width * 0.04,
          }}
          source={props.icon}
        />

        <Text
          style={{
            color: props.color,
            fontSize: appStyles.regularFontSize - 4,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {props.text}
        </Text>
        <Text
          style={{
            color: appStyles.greyColor,
            fontSize: appStyles.regularFontSize - 4,
            textAlign: "center",
          }}
        >
          {props.subtitle}
        </Text>
      </View>
    </TouchableHighlight>
  );
}
