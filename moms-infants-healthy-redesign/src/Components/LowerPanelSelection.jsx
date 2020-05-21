import React from 'react';
import babyBottle from "../../assets/baby-bottle.png";
import clinicLogo from "../../assets/clinic-logo.png";
import lightBulb from "../../assets/light-bulb.png";
import WelcomeUserBanner from "./WelcomeUserBanner";
import SelectionButton from "./SelectionButton";
import GestureRecognizer from "react-native-swipe-gestures";


export default function LowerPanelSelection(props) {
    return (
        <GestureRecognizer
            onSwipeUp={() => props.setFullPanel(true)}
            onSwipeDown={() => props.setFullPanel(false)}
            config={{velocityThreshold: 0.4, directionalOffsetThreshold: 100}}
            style={{width: '100%', height: '100%', paddingTop: '10%' , alignItems: 'center'}}>
            <WelcomeUserBanner fullName={props.fullName} logout={props.logout} getLocalizedText={props.getLocalizedText}/>
            <SelectionButton text={props.getLocalizedText("findCare")} icon={clinicLogo}
                             onPress={() => props.setLowerPanelContent('findCare')}/>
            <SelectionButton text={props.getLocalizedText("learn")} icon={babyBottle}
                             onPress={() => {props.setLowerPanelContent('learn');}}/>
            <SelectionButton text={props.getLocalizedText("tipsAndTricks")} icon={lightBulb}
                             onPress={() => {props.setLowerPanelContent('selection'); alert(props.getLocalizedText("comingSoon"))}}/>
        </GestureRecognizer>
    )
}