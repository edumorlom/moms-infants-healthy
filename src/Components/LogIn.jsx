import {
    Animated,
    Image,
    ImageBackground,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Keyboard,
    Text
} from 'react-native';
import React from "react";
import appStyles from "./AppStyles";
import Button from "./Button";
import TextInput from "./TextInput";
import SwipeUp from "./SwipeUp";
import background from "../../assets/background.gif";
import loginMainImage from "../../assets/child.png";

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this._start();
  }

  state = { email: null, password: null, fadeValue: new Animated.Value(0) };

  setEmail = (email) => {
    this.setState({ email: email });
  };

    setEmail = (email) => {
        this.setState({email: email})
    };

    setPassword = (password) => {
        this.setState({password: password})
    };

    _start = () => {
        Animated.timing(this.state.fadeValue, {
            toValue: 1,
            duration: 2000
        }).start();
    };

    render() {
        return (
            <React.Fragment>
                <Animated.View style={{opacity: this.state.fadeValue, height: '100%', width: '100%'}}>
                    <TouchableOpacity onPress={Keyboard.dismiss} accessible={false}>
                    <ImageBackground source={background} style={{position: 'absolute', opacity: 0.75, width: appStyles.win.width, height: appStyles.win.height}}/>
                    <View style={{paddingTop: appStyles.win.height * 0.05, alignItems: 'center'}}>
                        <Image style={{width: appStyles.win.height * 0.17, height: appStyles.win.height * 0.17, margin: appStyles.win.height * 0.02}} source={loginMainImage}/>
                        <TextInput placeholder={this.props.getLocalizedText('emailInput')} onChangeText={this.setEmail}/>
                        <TextInput type={"password"} placeholder={this.props.getLocalizedText('passwordInput')} onChangeText={this.setPassword}/>
                        <View style={{height: appStyles.win.height * 0.03}}/>
                        <Button onPress={() => this.props.login(this.state.email, this.state.password)} text={this.props.getLocalizedText('signInButton')}/>
                        <TouchableHighlight onPress={() => this.props.setAppState({screen: 'forgotPassword'})} ><Text style={{paddingTop: 20, color: 'white', fontWeight: '500'}}>{this.props.getLocalizedText("forgotPassword")}</Text></TouchableHighlight>
                    </View>
                    </TouchableOpacity>
                </Animated.View>
                <SwipeUp text={this.props.getLocalizedText('swipeUpToSignUp')}
                         onSwipeUp={() => this.props.setAppState({screen: 'signup'})}/>
            </React.Fragment>

  // _start = () => {
  //   Animated.timing(this.state.fadeValue, {
  //     toValue: 1,
  //     duration: 2000,
  //   }).start();
  // };

  // render() {
  //   return (
  //     <React.Fragment>
  //       <Animated.View
  //         style={{
  //           opacity: this.state.fadeValue,
  //           height: "100%",
  //           width: "100%",
  //         }}
  //       >
  //         <TouchableOpacity onPress={Keyboard.dismiss} accessible={false}>
  //           <ImageBackground
  //             source={background}
  //             style={{
  //               position: "absolute",
  //               opacity: 0.75,
  //               width: appStyles.win.width,
  //               height: appStyles.win.height,
  //             }}
  //           />
  //           <View
  //             style={{
  //               paddingTop: appStyles.win.height * 0.05,
  //               alignItems: "center",
  //             }}
  //           >
  //             <Image
  //               style={{
  //                 width: appStyles.win.height * 0.17,
  //                 height: appStyles.win.height * 0.17,
  //                 margin: appStyles.win.height * 0.02,
  //               }}
  //               source={loginMainImage}
  //             />
  //             <TextInput
  //               placeholder={this.props.getLocalizedText("emailInput")}
  //               onChangeText={this.setEmail}
  //             />
  //             <TextInput
  //               type={"password"}
  //               placeholder={this.props.getLocalizedText("passwordInput")}
  //               onChangeText={this.setPassword}
  //             />
  //             <View style={{ height: appStyles.win.height * 0.03 }} />
  //             <Button
  //               onPress={() =>
  //                 this.props.login(this.state.email, this.state.password)
  //               }
  //               text={this.props.getLocalizedText("signInButton")}
  //             />
  //           </View>
  //         </TouchableOpacity>
  //       </Animated.View>
  //       <SwipeUp
  //         text={this.props.getLocalizedText("swipeUpToSignUp")}
  //         onSwipeUp={() => this.props.setAppState({ screen: "signup" })}
  //       />
  //     </React.Fragment>
    );
  }
}
