import React, { useState, useEffect } from "react";
import { TouchableHighlight, Text, View, ScrollView, Image } from "react-native";
import appStyles, { blueColor, greyColor } from "./AppStyles";
import SelectionButton from "./SelectionButton";
import translate from "./getLocalizedText";
import FemaleCondom from "../../assets/FemaleCondom.png"

export default function FemaleCondomMain(props) {

    return (
        <ScrollView
            contentContainerStyle={{ alignItems: "center", maxWidth: "100%" }}
        >
            <Image style={{ justifyContent: "center", width: 300, height: 140 }} source={FemaleCondom}></Image>
            <Text
                style={{
                    fontSize: appStyles.regularFontSize - 5,
                    justifyContent: "center",
                    paddingHorizontal: 20,
                    paddingBottom: 5,
                    paddingTop: 5
                }}>
                {translate("WhatIsFemaleCondom")}</Text>

            <SelectionButton
                style={appStyles.STDFemaleCondomSelectionButton}
                text={translate("FemaleCondomDoDont")}
                onPress={() => {
                    props.getNextScreen(1);
                }}
            />
            <SelectionButton
                style={appStyles.STDFemaleCondomSelectionButton}
                text={translate("FemaleCondomHowTo")}
                onPress={() => {
                    props.getNextScreen(2);
                }}
            />
        </ScrollView>
    );
}