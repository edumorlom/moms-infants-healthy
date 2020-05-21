import React from "react";
import SignUpInfo from "./SignUpInfo";
import LetsGetStarted from "./LetsGetStarted";
import SignUpPassword from "./SignUpPassword";
import SignUpBabyGender from "./SignUpBabyGender";
import Firebase from "./Firebase";
import SignUpContact from "./SignUpContact";
import SignUpLoading from "./SignUpLoading";
import SignUpYesorNo from "./SignUpYesorNo";
import MustLiveInMiami from "./MustLiveInMiami";


export default class SignUp extends React.Component {
    state = {index: 0, email: null, phoneNumber: null, password: null, fullName: null, dob: null, pregnant: null, infant: null, babyGender: null, liveMiami: null};
    showGenderSelection = false;
    showMiamiOnlyAlert = true;

    getNextScreen = () => {
        let currentIndex = this.state.index;

        if (!this.showMiamiOnlyAlert && currentIndex === 1){
            currentIndex++;
        }

        if (!this.showGenderSelection && currentIndex === 7) {
            currentIndex++;
        }

        if (currentIndex < this.screens.length - 1){
            currentIndex++;
        }

        this.setState({index: currentIndex})
    };

    isEquivalent = (a, b) => {
        // Create arrays of property names
        let aProps = Object.getOwnPropertyNames(a);
        let bProps = Object.getOwnPropertyNames(b);

        // If number of properties is different,
        // objects are not equivalent
        if (aProps.length !== bProps.length) {
            return false;
        }

        for (let i = 0; i < aProps.length; i++) {
            let propName = aProps[i];

            // If values of same property are not equal,
            // objects are not equivalent
            if (a[propName] !== b[propName]) {
                return false;
            }
        }

        // If we made it this far, objects
        // are considered equivalent
        return true;
    };

    setUserInfo = (keyToValue) => {
        if (this.isEquivalent(keyToValue, {pregnant: true}) || this.isEquivalent(keyToValue, {infant: true})) {
            this.showGenderSelection = true;
        }

        if (this.isEquivalent(keyToValue, {liveMiami: true})) {
            this.showMiamiOnlyAlert = false;
        }

        this.setState(keyToValue);

    };

    signUpAndUploadData = () => {
        let fb = new Firebase();
        fb.signUp(this.state.email, this.state.phoneNumber, this.state.password, this.state.fullName, this.state.dob, this.state.pregnant, this.state.infant, this.state.babyGender);
        setTimeout( () => {
            this.props.login(this.state.email, this.state.password)
        }, 2000);
    };

    screens = [
        <LetsGetStarted setUserInfo={this.setUserInfo} getNextScreen={this.getNextScreen} getLocalizedText={this.props.getLocalizedText}/>,
        <SignUpYesorNo setUserInfo={this.setUserInfo} question={this.props.getLocalizedText("liveMiami")} value={"liveMiami"} getNextScreen={this.getNextScreen} getLocalizedText={this.props.getLocalizedText}/>,
        <MustLiveInMiami getNextScreen={this.getNextScreen} getLocalizedText={this.props.getLocalizedText}/>,
        <SignUpInfo setUserInfo={this.setUserInfo} getNextScreen={this.getNextScreen} getLocalizedText={this.props.getLocalizedText}/>,
        <SignUpContact setUserInfo={this.setUserInfo} getNextScreen={this.getNextScreen} getLocalizedText={this.props.getLocalizedText}/>,
        <SignUpPassword setUserInfo={this.setUserInfo} getNextScreen={this.getNextScreen} getLocalizedText={this.props.getLocalizedText}/>,
        <SignUpYesorNo setUserInfo={this.setUserInfo} question={this.props.getLocalizedText("areYouPregnant")} value={"pregnant"} getNextScreen={this.getNextScreen} getLocalizedText={this.props.getLocalizedText}/>,
        <SignUpYesorNo setUserInfo={this.setUserInfo} question={this.props.getLocalizedText("doYouHaveInfants")} value={"infant"} getNextScreen={this.getNextScreen} getLocalizedText={this.props.getLocalizedText}/>,
        <SignUpBabyGender setUserInfo={this.setUserInfo} getNextScreen={this.getNextScreen} getLocalizedText={this.props.getLocalizedText}/>,
        <SignUpLoading signUpAndUploadData={this.signUpAndUploadData} getLocalizedText={this.props.getLocalizedText}/>
    ];

    render() {
        return (this.screens[this.state.index])
    }
};
