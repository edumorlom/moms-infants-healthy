import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import {
  AsyncStorage,
  NativeModules,
  Text,
  StyleSheet,
  View,
  Button,
  Image,
} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {
  logIn,
  registerForPushNotificationsAsync,
  storeObjectInDatabase,
  getUserInfo,
} from './src/Firebase';
import appStyles from './src/Components/AppStyles';
import backArrow from './assets/go-back-arrow.png';

import LogIn from './src/Components/LogIn';
import TestingScreen from './src/Components/TestingScreen';
import LetsGetStarted from './src/Components/LetsGetStarted';
import SignUpInfo from './src/Components/SignUpInfo';
import SignUpYesorNo from './src/Components/SignUpYesorNo';
import MustLiveInMiami from './src/Components/MustLiveInMiami';
import SignUpContact from './src/Components/SignUpContact';
import SignUpPassword from './src/Components/SignUpPassword';
import SignUpBabyDob from './src/Components/SignUpBabyDob';
import SignUpLoading from './src/Components/SignUpLoading';
import Homepage from './src/Components/Homepage';
import SettingsScreen from './src/Components/SettingsScreen';
import ForgotPasswordPage from './src/Components/ForgotPasswordPage';
import ResourcesPage from './src/Components/ResourcesPage';
import Learn from './src/Components/Learn';
import STDSelection from './src/Components/STDSelection';
import {
  FemaleCondomMainScreen,
  FemaleCondomDoDont,
  FemaleCondomSteps,
} from './src/Components/FemaleCondom';
import WICScreen from './src/Components/WICScreen';
import MedicaidScreen from './src/Components/MedicaidScreen';
import Appointment from './src/Components/Appointment';
import NewAppointment from './src/Components/NewAppointment';
import Documents from './src/Components/Documents';
import ReferenceNames from './src/Components/ReferenceNames';
import AddReferenceNames from './src/Components/AddReferenceNames';
import STDInfo from './src/Components/STDInfo';
import ImmunizationMenu from './src/Components/Immunization';
import NewImmunization from './src/Components/NewImmunization';
// import * as firebase from "firebase";

function App() {
  let backArrowImage = () => {
    return <Image source={backArrow} style={styles.goBackArrow} />;
  };

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerBackImage: backArrowImage,
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitle,
          headerBackTitle: false,
        }}
      >
        <Stack.Screen
          name="LogIn"
          component={LogIn}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="TestingScreen"
          component={TestingScreen}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="LetsGetStarted"
          component={LetsGetStarted}
          options={{headerTransparent: true, title: ''}}
        />
        <Stack.Screen
          name="SignUpYesorNoMiami"
          component={SignUpYesorNo}
          options={{headerTransparent: true, title: ''}}
        />
        <Stack.Screen
          name="MustLiveInMiami"
          component={MustLiveInMiami}
          options={{
            headerTransparent: true,
            title: '',
          }}
        />
        <Stack.Screen
          name="SignUpInfo"
          component={SignUpInfo}
          options={{headerTransparent: true, title: ''}}
        />
        <Stack.Screen
          name="SignUpContact"
          component={SignUpContact}
          options={{headerTransparent: true, title: ''}}
        />
        <Stack.Screen
          name="SignUpPassword"
          component={SignUpPassword}
          options={{headerTransparent: true, title: ''}}
        />
        <Stack.Screen
          name="SignUpYesorNoPregnant"
          component={SignUpYesorNo}
          options={{headerTransparent: true, title: ''}}
        />
        <Stack.Screen
          name="SignUpYesorNoInfant"
          component={SignUpYesorNo}
          options={{headerTransparent: true, title: ''}}
        />
        <Stack.Screen
          name="SignUpBabyDob"
          component={SignUpBabyDob}
          options={{headerTransparent: true, title: ''}}
        />
        <Stack.Screen
          name="SignUpLoading"
          component={SignUpLoading}
          options={{headerTransparent: true, title: ''}}
        />
        <Stack.Screen
          name="Homepage"
          component={Homepage}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            title: 'Settings',
          }}
        />
        <Stack.Screen
          name="ForgotPasswordPage"
          component={ForgotPasswordPage}
          options={{title: 'Forgot Password'}}
        />
        <Stack.Screen
          name="ResourcesPage"
          component={ResourcesPage}
          options={{title: 'Resources'}}
        />
        <Stack.Screen name="Learn" component={Learn} />
        <Stack.Screen
          name="STDSelection"
          component={STDSelection}
          options={{title: 'STDs'}}
        />
        <Stack.Screen
          name="FemaleCondomMainScreen"
          component={FemaleCondomMainScreen}
          options={{title: 'Female Condom'}}
        />
        <Stack.Screen
          name="FemaleCondomDoDont"
          component={FemaleCondomDoDont}
          options={{title: "Do's & Dont's"}}
        />
        <Stack.Screen
          name="FemaleCondomSteps"
          component={FemaleCondomSteps}
          options={{title: 'Steps'}}
        />
        <Stack.Screen
          name="WICScreen"
          component={WICScreen}
          options={{title: 'WIC'}}
        />
        <Stack.Screen
          name="MedicaidScreen"
          component={MedicaidScreen}
          options={{title: 'Medicaid'}}
        />
        <Stack.Screen
          name="ImmunizationScreen"
          component={ImmunizationMenu}
          options={{title: 'Immunization'}}
        />
        <Stack.Screen
          name="NewImmunization"
          component={NewImmunization}
          options={{title: 'New Immunization'}}
        />
        <Stack.Screen
          name="Appointment"
          component={Appointment}
          options={{title: 'Appointments'}}
        />
        <Stack.Screen
          name="NewAppointment"
          component={NewAppointment}
          options={{title: 'New Appointment'}}
        />
        <Stack.Screen name="Documents" component={Documents} />
        <Stack.Screen
          name="ReferenceNames"
          component={ReferenceNames}
          options={{title: 'References'}}
        />
        <Stack.Screen
          name="AddReferenceNames"
          component={AddReferenceNames}
          options={{title: 'Add Reference'}}
        />
        <Stack.Screen
          name="STDInfo"
          component={STDInfo}
          options={({route}) => ({title: route.params.name})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  logOutButton: {
    position: 'absolute',
    right: appStyles.win.height * 0.03,
    top: appStyles.win.width * 0.04,
  },
  goBackArrow: {
    width: 25,
    height: 25,
  },
  headerTitle: {
    fontSize: 25,
    color: appStyles.blueColor,
  },
});
