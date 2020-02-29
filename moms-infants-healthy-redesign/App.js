import React from 'react';
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Homepage from "./Homepage";



export default class App extends React.Component {
  state = {
    screen: 'login'
  };

  setAppState = (object) => {
    this.setState(object)
  };

  render() {
    if (this.state.screen === 'login') {
      return (<LogIn setAppState={this.setAppState}/>)
    } else if (this.state.screen === 'signup') {
      try {
        return (<SignUp setAppState={this.setAppState}/>)
      } catch (err) {
        this.setAppState({screen: 'login'})
      }
    } else {
      return (<Homepage/>)
    }
  }
}