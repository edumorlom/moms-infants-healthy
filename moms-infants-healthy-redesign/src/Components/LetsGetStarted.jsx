import {Image, Text, View, Animated} from 'react-native';
import React from "react";
import heartBalloon from "../../assets/heart-balloon.png"
import appStyles from './AppStyles'
import ConfettiCannon from 'react-native-confetti-cannon';
import * as Haptics from "expo-haptics";

export default class LetsGetStarted extends React.Component {

    constructor(props) {
        super(props);
        this.confettiVibration();
        this._start();
        setTimeout(() => this.props.getNextScreen(), 4000)

    }

    state = {
        fadeValue: new Animated.Value(0)
    };

    _start = () => {
        Animated.timing(this.state.fadeValue, {
            toValue: 1,
            duration: 1000
        }).start();
    };

    confettiVibration = () => {
        Haptics.selectionAsync().then(() => {
            Haptics.selectionAsync().then(() => {
                Haptics.selectionAsync().then(() => {
                    Haptics.selectionAsync().then(() => {
                        Haptics.selectionAsync().then(() => {
                            Haptics.selectionAsync().then(() => {
                                Haptics.selectionAsync().then(() => {
                                    Haptics.selectionAsync().then(() => {
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    };

    render() {
        return (
            <Animated.View style={{opacity: this.state.fadeValue, ...appStyles.container}}>
                <ConfettiCannon count={150} origin={{x: -10, y: 0}} fallSpeed={2500} colors={[appStyles.blueColor, appStyles.pinkColor]}/>
                <View style={{
                    paddingTop: appStyles.win.height * 0.10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute'}}>
                    <Text style={appStyles.titleBlue}>{this.props.getLocalizedText("letsGetStarted")}</Text>
                    <Image style={{margin: 100, width: appStyles.win.height * 0.15, height: appStyles.win.height * 0.15}} source={heartBalloon}/>
                    <Text style={{...appStyles.paragraphText, textAlign: 'center', paddingTop: 100, color: 'black'} }>{this.props.getLocalizedText('parentingIsntEasy')}</Text>
                    <Text style={{...appStyles.paragraphText, textAlign: 'center'} }>{this.props.getLocalizedText("hereToHelp")}</Text>
                </View>
            </Animated.View>
        );
    }
}
