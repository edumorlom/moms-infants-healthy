import React, { useState, useEffect } from "react";
import {View, AsyncStorage} from "react-native";
import SignUpInfo from "./SignUpInfo";
import LetsGetStarted from "./LetsGetStarted";
import SignUpPassword from "./SignUpPassword";
import SignUpBabyGender from "./SignUpBabyGender";
import SignUpBabyDob from "./SignUpBabyDob";
import Firebase from "./Firebase";
import SignUpContact from "./SignUpContact";
import SignUpLoading from "./SignUpLoading";
import SignUpYesorNo from "./SignUpYesorNo";
import MustLiveInMiami from "./MustLiveInMiami";
import SignUpHeader from "./SignUpHeader";


export default function SignUp (props) {

    const [index, setIndex] = useState(0);
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [dob, setDob] = useState('');
    const [pregnant, setPregnant] = useState(null);
    const [infant, setInfant] = useState(null);
    const [liveMiami, setLiveMiami] = useState(null);
    const [babyDOB, setBabyDOB] = useState('');
    
    useEffect(() => {
        if (index < 0 ) {
            props.setAppState({screen: 'login'})
        }
    })




    let showGenderSelection = false;
    let showMiamiOnlyAlert = true;

    let getNextScreen = () => {
        let currentIndex = index;

        if (!showMiamiOnlyAlert && currentIndex === 1){
            currentIndex++;
        }

        if (!showGenderSelection && currentIndex === 7) {
            currentIndex++;
        }

        if (currentIndex < screens.length - 1){
            currentIndex++;
        }

        setIndex(currentIndex)
    };

    let goBack = () => {
        let currentIndex = index;

        if (currentIndex === 3){    //Skip Miami Pnly Alert when going back (user already saw it)
            currentIndex--;
        }

        // if (!showGenderSelection && currentIndex === 9) {
        //     currentIndex--;
        // }
        currentIndex--;
        
        setIndex(currentIndex)
    }

    let isEquivalent = (a, b) => {
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

    let setUserInfo = (keyToValue) => {
        if (isEquivalent(keyToValue, {pregnant: true}) || isEquivalent(keyToValue, {infant: true})) {
            showGenderSelection = true;
        }

        if (isEquivalent(keyToValue, {liveMiami: true})) {
            showMiamiOnlyAlert = false;
        }
        
        let property = Object.getOwnPropertyNames(keyToValue)[0];
        let value = keyToValue[property];

        //This had to happen when switching to function useState
        //Fixed in the future with useContext and the Context API
        switch(property) {
            case 'index': setIndex(value); break;
            case 'email': setEmail(value); break;
            case 'phoneNumber': setPhoneNumber(value); break;
            case 'password': setPassword(value); break;
            case 'fullName': setFullName(value); break;
            case 'dob': setDob(value); break;
            case 'pregnant': setPregnant(value); break;
            case 'infant': setInfant(value); break;
            case 'liveMiami': setLiveMiami(value); break;
            case 'babyDOB': setBabyDOB(value); break;
            default: throw new Error('That is not one of the state elements in SignUp')
          }

    };

    let signUpAndUploadData = () => {
        let fb = new Firebase();
        let info = getNextWeekAndWeekNo();
        fb.signUp(email, phoneNumber, password, fullName, 
            dob, pregnant, infant, babyGender, babyDOB, liveMiami, ...info);
        //Unbinds Async Storage keys used in sign up after successful sign up
        let keys = ['name', 'dob', 'e-mail', 'phone', 'pass', 'repeat', 'babyDOB', 'liveMiami'];
        AsyncStorage.multiRemove(keys, (err) => {console.log(err)});
        setTimeout( () => {
            props.login(email, password)
        }, 2000);
    };

    let getNextWeekAndWeekNo = () => {
        let babyDOB = new Date(babyDOB); 
        let today = new Date(); 
        let daysDifference = (today.getTime() - babyDOB.getTime()) / (1000 * 3600 * 24) | 0;
        let daysTillNextWeek = (7 - daysDifference % 7) % 7;        
        let nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysTillNextWeek);
        let nextWeek = (nextweek.getMonth()+1).toString().padStart(2, "0") +'/'+nextweek.getDate().toString().padStart(2, "0") +'/'+ nextweek.getFullYear()
        let weekNo = daysTillNextWeek === 0 ? (daysDifference / 7)  | 0 : ((daysDifference / 7) + 1) | 0;
        if (weekNo > 24) { nextWeek = null; weekNo = null }
        return [nextWeek, weekNo]
    }

    

    let screens = [
        <LetsGetStarted setUserInfo={setUserInfo} getNextScreen={getNextScreen} getLocalizedText={props.getLocalizedText}/>,
        <SignUpYesorNo setUserInfo={setUserInfo} question={props.getLocalizedText("liveMiami")} value={"liveMiami"} getNextScreen={getNextScreen} getLocalizedText={props.getLocalizedText}/>,
        <MustLiveInMiami getNextScreen={getNextScreen} getLocalizedText={props.getLocalizedText}/>,
        <SignUpInfo setUserInfo={setUserInfo} getNextScreen={getNextScreen} getLocalizedText={props.getLocalizedText}/>,
        <SignUpContact setUserInfo={setUserInfo} getNextScreen={getNextScreen} getLocalizedText={props.getLocalizedText} email= {email}/>,
        <SignUpPassword setUserInfo={setUserInfo} getNextScreen={getNextScreen} getLocalizedText={props.getLocalizedText}/>,
        <SignUpYesorNo setUserInfo={setUserInfo} question={props.getLocalizedText("areYouPregnant")} value={"pregnant"} getNextScreen={getNextScreen} getLocalizedText={props.getLocalizedText}/>,
        <SignUpYesorNo setUserInfo={setUserInfo} question={props.getLocalizedText("doYouHaveInfants")} value={"infant"} getNextScreen={getNextScreen} getLocalizedText={props.getLocalizedText}/>,
        // <SignUpBabyGender setUserInfo={setUserInfo} getNextScreen={getNextScreen} getLocalizedText={props.getLocalizedText}/>,
        <SignUpBabyDob setUserInfo={setUserInfo} getNextScreen={getNextScreen} getLocalizedText={props.getLocalizedText}/>,
        <SignUpLoading signUpAndUploadData={signUpAndUploadData} getLocalizedText={props.getLocalizedText}/>
    ];


        // let male = babyGender ? babyGender.male : false;
        // let female = babyGender ? babyGender.female : false;

        return (
            
            <View style={{height: '100%'}}>
                {/* <SignUpHeader goBack= {goBack} male = {male} female = {female} index = {index}/> */}
                <SignUpHeader goBack= {goBack}  index = {index}/>
                {screens[index]}
            </View>


        )
            
    
};
