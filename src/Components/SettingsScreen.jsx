import { TextInputMask } from 'react-native-masked-text';
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput as TextBox,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import BackButton from './Button'
import Button from './Button'
import {getUserInfo, getUid} from "../Firebase";
import goBackImg from "../../assets/go-back-arrow.png";
import * as Haptics from "expo-haptics";
import appStyles from "./AppStyles";
import { Picker } from 'react-native';
import * as firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons';
import translate from "./getLocalizedText";


const SettingsScreen = (props) => {



  const [phoneNumber, setPhoneNumber] = useState(null);
  const [dob, setdob] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [liveMiami, setLiveMiami] = useState(null);
  const [infant, setInfant] = useState(null);
 
  const [babyDOB, setBabyDOB] = useState(null);
  const [pregnant, setPregnant] = useState(null);
  const datetimeField = useRef(null);
  const [databaseInfo, setDatabaseInfo] = useState([]);
  let _isMounted = false;


  const uid = getUid();

  const goBack = () => {
    Haptics.selectionAsync().then();
    props.goBack();
  };

  AsyncAlert = () => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        translate("logout"),
        translate('WantToLogout'),
        [
          { text: translate("Yes"), onPress: () => resolve(true) },
          { text: translate("No"), onPress: () => resolve(false) },
        ],
        { cancelable: false }
      );
    });
  };


  fetchUserInfo = () => {
    _isMounted = true;


    if (uid !== null) {
      console.log("User id >>>>>>>>>: " + uid);
      getUserInfo(uid).on('value', (snapshot) => {
          if (_isMounted) {
            let SnapShot = snapshot.val();
            /*  Info currently from the database*/
            let databaseInfo = [SnapShot?.fullName, SnapShot?.phoneNumber, SnapShot?.dob, SnapShot?.infant, SnapShot?.pregnant, SnapShot?.liveMiami, SnapShot?.babyDOB]

            let [fullName, phoneNumber, dob, infant, pregnant, liveMiami, babyDOB] = databaseInfo;

            setFullName(fullName);
            setPhoneNumber(phoneNumber);
            setPregnant(pregnant);
            setInfant(infant);
            setdob(dob);
            setLiveMiami(liveMiami);
            setBabyDOB(babyDOB);

            setDatabaseInfo(databaseInfo);
          }

      });

    } else {
      alert("Error: Couldn't get the user Information");
    }


  };





  onSubmit = () => {
    Haptics.selectionAsync().then();
    /* This function returns an array with nextWeek and week number */
    let babyInfo = getNextWeekAndWeekNo();
    /* We make copies of the state variables so we can mutate them */
    let [FullName, PhoneNumber, Dob, Infant, Pregnant, LiveMiami, BabyDOB] = [fullName, phoneNumber, dob, infant, pregnant, liveMiami, babyDOB]

    /* Original user info from the database */
    let [_fullName, _phoneNumber, _dob, _infant, _pregnant, _liveMiami, _babyDOB] = databaseInfo;

    if (!Infant) {
      BabyDOB = null;
      babyInfo[0] = null;
      babyInfo[1] = null;
    }
    // Making sure some values are not null

    /*  If value is undefined/null, set it to false*/ 
    !LiveMiami ? LiveMiami = false : null
    !Infant ? Infant = false : null
    !Pregnant ? Pregnant = false : null


    let userInfo = {};
    FullName !== _fullName ? userInfo.fullName = FullName : null
    PhoneNumber !== _phoneNumber ? userInfo.phoneNumber = PhoneNumber : null
    Dob !== _dob ? userInfo.dob = Dob : null
    Pregnant !== _pregnant ? userInfo.pregnant = Pregnant : null
    LiveMiami !== _liveMiami ? userInfo.liveMiami = LiveMiami : null
    BabyDOB !== _babyDOB ? userInfo.babyDOB = BabyDOB : null

    if (Infant !== _infant ) {
      userInfo.infant = Infant;
      userInfo.nextWeek = babyInfo[0];
      userInfo.week = babyInfo[1];
    }

    if (!FullName || !PhoneNumber || !Dob || (Infant && !BabyDOB) ) {
      alert(translate("fillOutAllFields"));
    } else if (Object.keys(userInfo).length === 0) { //All info same
      
      alert("No user information was changed");

    } else {
      firebase.database().ref('users/' + uid).update(userInfo)
      .catch(err => console.log(err));

      window.alert(translate("savedInfo"));
    }

  }


  useEffect(() => {
    fetchUserInfo();

    return () => _isMounted = false;

  }, []);

  getNextWeekAndWeekNo = () => {
    let newbabyDOB = new Date(babyDOB);
    let today = new Date();
    let daysDifference = (today.getTime() - newbabyDOB.getTime()) / (1000 * 3600 * 24) | 0; //The | 0 is just a way to cast to int
    let daysTillNextWeek = (7 - daysDifference % 7) % 7;
    let nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysTillNextWeek);
    let nextWeek = (nextweek.getMonth() + 1).toString().padStart(2, "0") + '/' + nextweek.getDate().toString().padStart(2, "0") + '/' + nextweek.getFullYear()
    let weekNo = daysTillNextWeek === 0 ? (daysDifference / 7) | 0 : ((daysDifference / 7) + 1) | 0;
    if (weekNo > 24) { nextWeek = null; weekNo = null }
    return [nextWeek, weekNo]
  }


  return (
    <View style={{ flex: 1 }}>
      <BackButton
          style={backButton}
          icon={goBackImg}
          underlayColor={"transparent"}
          onPress= {goBack}
        />
      <View style={styles.logOutButton}>
        <AntDesign name="logout" size={28} color={appStyles.pinkColor} onPress={() => {
          AsyncAlert().then((response) => {
            response ? props.logout() : null;
          });
        }}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text
            style={{
              color: appStyles.blueColor,
              fontSize: appStyles.titleFontSize,
              fontWeight: 'bold',
              alignSelf: 'center',
              paddingTop: 15
            }}>{translate('welcomeSettings')}</Text>
        </View>
        <View style={{ alignItems: 'center', paddingTop: 25 }}>
          <View style={{ marginBottom: 15, alignItems: 'center' }}>
            <Text style={appStyles.blueColor}>{translate("phoneNumberInput")}:</Text>
            <View style={appStyles.TextInput.View}>
              <TextBox
                placeholder={translate("phoneNumberInput")}
                style={appStyles.TextInput.TextInput}
                value={phoneNumber}
                keyboardType={"numeric"}
                onChangeText={(text) => setPhoneNumber(text)}
              />
            </View>
          </View>

          <View style={{ marginBottom: 15, alignItems: 'center' }}>
            <Text style={appStyles.blueColor}>{translate("dob")}:</Text>
            <View>
              <TextInputMask
                type={"datetime"}
                options={{
                  format: "MM/DD/YYYY",
                  validator: function (value, settings) {
                    let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
                    return regex.test(value);
                  }, //This validator function is read by isValid()
                  //Still need to implement a check for isValid
                }}
                style={appStyles.TextInputMask}
                value={dob}
                placeholder={translate("dob")}
                onChangeText={
                  (text) => setdob(text)
                }
                // Ref for use of isValid(), like this.datetimeField.isValid()
                ref={(ref) => datetimeField.current = ref}
              />

            </View>
          </View>
          <View style={{ marginBottom: 10, alignItems: 'center' }}>
            <Text style={appStyles.blueColor}>{translate("fullName")}:</Text>
            <View style={appStyles.TextInput.View}>
              <TextBox
                placeholder={translate("fullName")}
                style={appStyles.TextInput.TextInput}
                value={fullName}
                onChangeText={(text) => setFullName(text)}
              />
            </View>
          </View>
          <View style={styles.containerDropDown}>
            <Text >{translate("liveMiami")}</Text>
            <Picker
              selectedValue={liveMiami}
              style={styles.questionsDropDown}
              onValueChange={(itemValue, itemIndex) =>
                setLiveMiami(itemValue)
              }>
              <Picker.Item label={translate("Yes")} value={true} />
              <Picker.Item label={translate("No")} value={false} />
            </Picker>
          </View>
          <View style={styles.containerDropDown}>
            <Text >{translate("areYouPregnant")}</Text>
            <Picker
              selectedValue={pregnant}
              style={styles.questionsDropDown}
              onValueChange={(itemValue, itemIndex) =>
                setPregnant(itemValue)
              }>
              <Picker.Item label={translate("Yes")} value={true} />
              <Picker.Item label={translate("No")} value={false} />
            </Picker>
          </View>
          <View style={styles.containerDropDown}>
            <Text >{translate("didYouHaveInfants")}</Text>
            <Picker
              selectedValue={infant}
              style={styles.questionsDropDown}
              onValueChange={(itemValue, itemIndex) =>
                setInfant(itemValue)
              }>
              <Picker.Item label={translate("Yes")} value={true} />
              <Picker.Item label={translate("No")} value={false} />
            </Picker>
          </View>
          {/*{infant === true ? 
            <View style={styles.containerDropDown}>
                  <Text >{translate("selectGenders")}</Text>
                 <Picker
                    selectedValue={(babyGender.male && babyGender.female)}
                    style={styles.questionsDropDown}
                    onValueChange={(itemValue, itemIndex) =>{
                        return setBabyGender({babyGender:{male: itemValue, female: itemValue}})
                    }}>
                    <Picker.Item label={translate("Male")} value={true} key='1' />
                    <Picker.Item label={translate("Female")} value={false}  key='2'/>
                 </Picker> 
            </View>
              : null} */}
          {infant === true ?
            <View >
              <Text style={{ alignSelf: 'center' }}>{translate("babydob")}</Text>
              <TextInputMask
                type={'datetime'}
                options={{
                  format: 'MM/DD/YYYY',
                  validator: function (value, settings) {
                    let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
                    return regex.test(value);
                  }
                }}
                style={appStyles.TextInputMask}
                value={babyDOB}
                placeholder={translate("dob")}
                onChangeText={
                  (text) => setBabyDOB(text)
                }
                // Ref for use of isValid(), like this.dateBaby.isValid()
                ref={(ref) => dateBaby = ref}
              />
            </View>
            : null}

        </View>
        <View style={{ justifyContent: 'center', flexDirection: 'row', padding: 90 }}>
          <Button 
          style={SubmitButton} 
          underlayColor={appStyles.blueColor}
          text={translate("save")}
          onPress={() => onSubmit()} />
        </View>
      </ScrollView>
    </View>
  );

}

const styles = StyleSheet.create({
  containerDropDown: {
    ...Platform.select({
      ios: {
        marginTop: 30,
        alignItems: "center",
        height: 160,
      },
      android: {
        marginTop: 30,
        alignItems: "center",
        height: 110,
      },
    }),
  },
  questionsDropDown: {
    ...Platform.select({
      ios: {
        width: 100,
        bottom: 50,
      },
      android: {
        width: 100,
        bottom: 10,
      },
    }),
  },
  logOutButton: {
    position: 'absolute', 
    right: appStyles.win.height * 0.03, 
    top: appStyles.win.width * 0.09,
  }
});

const backButton = StyleSheet.create({
  Touchable: {
    height: appStyles.win.height * 0.04,
    width: appStyles.win.width * 0.07,
    marginTop: "10%",
    marginLeft: "5%",

  },
  Image: {
    height: appStyles.win.width * 0.06,
    width: appStyles.win.width * 0.06,

  },
});

const SubmitButton = StyleSheet.create({
  Touchable: appStyles.button.Touchable,
  Text: appStyles.button.Text,
});



export default SettingsScreen;