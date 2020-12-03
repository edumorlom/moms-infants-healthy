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
import {
  wicHome,
  wicChecklist,
  wicLocations,
  wicFeeding,
} from './src/Components/WICScreen';
import LocationsInfo from './src/Components/LocationsInfo';
import {
  medicaidHome,
  medicaidChecklist,
  medicaidLocations,
} from './src/Components/MedicaidScreen';
import Appointment from './src/Components/Appointment';
import NewAppointment from './src/Components/NewAppointment';
import Documents from './src/Components/Documents';
import ReferenceNames from './src/Components/ReferenceNames';
import AddReferenceNames from './src/Components/AddReferenceNames';
import STDInfo from './src/Components/STDInfo';
import ImmunizationMenu from './src/Components/Immunization';
import NewImmunization from './src/Components/NewImmunization';
import ImmunizationSchedule from './src/Components/ImmunizationSchedule';
import translate from './src/Components/getLocalizedText';
// import * as firebase from "firebase";

function App() {
  let backArrowImage = () => {
    return <Image source={backArrow} style={styles.goBackArrow} />;
  };

  const Stack = createStackNavigator();
  const navigationRef = React.createRef();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerBackImage: backArrowImage,
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitle,
          headerBackTitle: false,
          headerRight: () => (
            <View style={styles.logOutButton}>
              <AntDesign
                name="home"
                size={28}
                color={appStyles.pinkColor}
                onPress={() => {
                  navigationRef.current?.navigate('Homepage');
                }}
              />
            </View>
          ),
        }}
      >
        <Stack.Screen
          name="LogIn"
          component={LogIn}
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
            title: translate('welcomeSettings'),
          }}
        />
        <Stack.Screen
          name="ForgotPasswordPage"
          component={ForgotPasswordPage}
          options={{title: translate('forgotPassword')}}
        />
        <Stack.Screen
          name="ResourcesPage"
          component={ResourcesPage}
          options={{title: translate('resources')}}
        />
        <Stack.Screen
          name="Learn"
          component={Learn}
          options={{title: translate('learn')}}
        />
        <Stack.Screen
          name="STDSelection"
          component={STDSelection}
          options={{title: 'STDs'}}
        />
        <Stack.Screen
          name="FemaleCondomMainScreen"
          component={FemaleCondomMainScreen}
          options={{title: translate('FemaleCondom')}}
        />
        <Stack.Screen
          name="FemaleCondomDoDont"
          component={FemaleCondomDoDont}
          options={{title: translate('dosAndDonts')}}
        />
        <Stack.Screen
          name="FemaleCondomSteps"
          component={FemaleCondomSteps}
          options={{title: translate('steps')}}
        />
        <Stack.Screen
          name="WICScreen"
          component={wicHome}
          options={{title: 'WIC'}}
        />
        <Stack.Screen
          name="WICChecklist"
          component={wicChecklist}
          options={{title: 'Checklist'}}
        />
        <Stack.Screen
          name="WICLocations"
          component={wicLocations}
          options={{title: 'Locations'}}
        />
        <Stack.Screen
          name="WICFeeding"
          component={wicFeeding}
          options={{title: 'Feeding'}}
        />
        <Stack.Screen
          name="LocationsInfo"
          component={LocationsInfo}
          options={{title: 'Info'}}
        />
        <Stack.Screen
          name="MedicaidScreen"
          component={medicaidHome}
          options={{title: 'Medicaid'}}
        />
        <Stack.Screen
          name="MedicaidChecklist"
          component={medicaidChecklist}
          options={{title: 'Checklist'}}
        />
        <Stack.Screen
          name="MedicaidLocations"
          component={medicaidLocations}
          options={{title: 'Locations'}}
        />
        <Stack.Screen
          name="ImmunizationScreen"
          component={ImmunizationMenu}
          options={{title: translate('ImmunizationRegister')}}
        />
        <Stack.Screen
          name="NewImmunization"
          component={NewImmunization}
          options={{title: translate('newImmunization')}}
        />
        <Stack.Screen
          name="ImmunizationSchedule"
          component={ImmunizationSchedule}
          options={{title: translate('ImmunizationSchedule')}}
        />
        <Stack.Screen
          name="Appointment"
          component={Appointment}
          options={{title: translate('appointment')}}
        />
        <Stack.Screen
          name="NewAppointment"
          component={NewAppointment}
          options={{title: translate('newAppointment')}}
        />
        <Stack.Screen
          name="Documents"
          component={Documents}
          options={{title: translate('documents')}}
        />
        <Stack.Screen
          name="ReferenceNames"
          component={ReferenceNames}
          options={{title: translate('NameReference')}}
        />
        <Stack.Screen
          name="AddReferenceNames"
          component={AddReferenceNames}
          options={{title: translate('AddNameReference')}}
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
