import {Text, View} from 'react-native';
import React from "react";
import appStyles from './AppStyles'
import MultipleChoiceButton from "./MultipleChoiceButton";


export default SignUpYesorNo = (props) =>  {

    let onPress = (userResponse) => {
        props.setUserInfo({[props.value]: userResponse});
        props.getNextScreen();
    };

    
        return (
            <View style={appStyles.container}>
                <View style={{
                    paddingTop: appStyles.win.height * 0.2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute'}}>
                    <Text style={{
                        color: 'black',
                        fontSize: appStyles.titleFontSize,
                        fontWeight: 'bold',
                        textAlign: 'center'}}>{props.question}</Text>
                    <View style={appStyles.rowContainer}>
                        <MultipleChoiceButton text={'✓'} color={appStyles.blueColor} onPress={() => onPress(true)}/>
                        <MultipleChoiceButton text={'X'} color={appStyles.pinkColor} onPress={() => onPress(false)}/>
                    </View>
                </View>
            </View>
        );
    }
