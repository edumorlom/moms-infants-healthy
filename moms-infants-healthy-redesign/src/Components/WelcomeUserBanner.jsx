import {Text, TouchableHighlight, View} from "react-native";
import appStyles from "./AppStyles";
import * as Haptics from "expo-haptics";
import React from 'react';

export default class WelcomeUserBanner extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        setTimeout(() => {
            this.setState({text: `${this.props.getLocalizedText('welcomeUserBanner')}${this.props.fullName ? ' ' + this.props.fullName.split(' ')[0] : ''}`});
        }, 1500);
    }

    state = {text: this.props.getLocalizedText('logout')};

    render() {
        return (
            <TouchableHighlight style={appStyles.WelcomeUserBanner.TouchableHighlight}
                                underlayColor={appStyles.pinkColor}
                                onPress={
                                    () => {
                                        Haptics.selectionAsync().then();
                                        alert(this.props.getLocalizedText('youLoggedOut'));
                                        this.props.logout();
                                    }
                                }>
                <Text style={{
                    color: "white",
                    fontSize: appStyles.regularFontSize,
                    fontWeight: 'bold'
                }}>
                    {this.state.text}</Text>
            </TouchableHighlight>
        )
    }
}