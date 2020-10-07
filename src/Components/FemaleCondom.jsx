import React, { useState, useEffect } from "react";
import { TouchableHighlight, Text, View, ScrollView, Image } from "react-native";
import appStyles from "./AppStyles";
import SelectionButton from "./SelectionButton";
import translate from "./getLocalizedText";
import FemaleCondomDoDont from "./FemaleCondomDoDonts"
import FemaleCondomSteps from "./FemaleCondomSteps"
import FemaleCondomMain from "./FemaleCondomMain"

export default function FemaleCondom(props) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < 0) {
            props.setLowerPanelContent("FemaleCondomMain");
        }
    });

    /*let goBack = () => {
        if (index == 0) {
            props.setLowerPanelContent("learn")
        } else {
            setIndex(0);
        }
    };
    */

    let getNextScreen = (value) => {
        setIndex(value);
    };

    let screens = [
        <FemaleCondomMain
            getNextScreen={getNextScreen}
        />,
        <FemaleCondomDoDont
            getNextScreen={getNextScreen}
        />,
        <FemaleCondomSteps
            getNextScreen={getNextScreen}
        />
    ];
    return (
        <ScrollView style={{ height: "100%" }}>
            {screens[index]}
        </ScrollView>
    );
}
