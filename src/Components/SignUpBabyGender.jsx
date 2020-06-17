import { Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import React from "react";
import appStyles from './AppStyles';
import MultipleChoiceButton from "./MultipleChoiceButton";
import Button from "./Button";

//Kinda a Deprecated component, would change it to use Functions, but we kinda not using it anymore
export default class SignUpBabyGender extends React.Component {
    state = {babyGender: {male: false, female: false}};

    onPress = () => {
        this.props.setUserInfo({babyGender: {male: this.state.babyGender.male, female: this.state.babyGender.female}});
        this.props.getNextScreen();
    };

    setBabyGender = (babyGender) => {
        let male = this.state.babyGender.male;
        let female = this.state.babyGender.female;


        if (babyGender === 'male'){
            male = !male;
        } else if (babyGender === 'female') {
            female = !female;
        } else {
            male = false;
            female = false;
        }
        this.setState({babyGender: {male: male, female: female}})
    };

    componentDidMount() {
        this.props.setUserInfo({babyGender: {male: this.state.babyGender.male, female: this.state.babyGender.female}});
        //This is to reset the color of the sign up header when babyGender loads
    }

    componentWillUnmount() {
        clearInterval(this.interval);
      }

    render() {
        let genderSelected = this.state.babyGender.male || this.state.babyGender.female;
        let backgroundColor = "white";
        let textColor = "black";

        if (genderSelected) {
            textColor = "white";
        }

        if (this.state.babyGender.male && this.state.babyGender.female) {
            backgroundColor = "#800080"
        } else if (this.state.babyGender.male) {
            backgroundColor = appStyles.blueColor;
        } else if (this.state.babyGender.female) {
            backgroundColor = appStyles.pinkColor
        }

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{...appStyles.container, backgroundColor: backgroundColor}}>
                    <View style={{
                        paddingTop: appStyles.win.height * 0.2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute'}}>
                        <Text style={{color: textColor, fontSize: appStyles.titleFontSize, fontWeight: 'bold', padding: 10, textAlign: 'center'}}>{this.props.getLocalizedText("selectGenders")}</Text>
                            <View style={appStyles.rowContainer}>
                                <MultipleChoiceButton text={'♂'} color={appStyles.blueColor} selected={this.state.babyGender.male} onPress={() => {this.setBabyGender('male');
                                                            this.props.setUserInfo({babyGender: {male: !this.state.babyGender.male, female: this.state.babyGender.female}});}}/>
                                <MultipleChoiceButton text={"♀"} color={appStyles.pinkColor} selected={this.state.babyGender.female} onPress={() => {this.setBabyGender('female'); 
                                                                this.props.setUserInfo({babyGender: {male: this.state.babyGender.male, female: !this.state.babyGender.female}});}}/>
                            </View>
                    </View>
                    <View style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: '12%'}}>
                        <Button text={this.state.babyGender.male || this.state.babyGender.female ? this.props.getLocalizedText("continueButton") : this.props.getLocalizedText("iDontKnowButton")} onPress={this.onPress}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}