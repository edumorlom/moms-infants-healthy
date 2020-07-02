import { TextInputMask } from 'react-native-masked-text';
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput as TextBox,
  ScrollView,
  TouchableHighlight,
  Image,
  Alert,
  Platform,
} from "react-native";
import {getUserInfo, getUid} from "../Firebase";
import goBackImg from "../../assets/go-back-arrow.png";
import * as Haptics from "expo-haptics";
import appStyles from "./AppStyles";
import { AsyncStorage, NativeModules, Picker } from 'react-native';
import * as firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons';
import translate from "app/Components/getLocalizedText";


const SettingScreen = (props) => {



  const [phoneNumber, setPhoneNumber] = useState(null);
  const [dob, setdob] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [liveMiami, setLiveMiami] = useState(null);
  const [infant, setInfant] = useState(null);
  // const [babyGender, setBabyGender] = useState({male: null, female: null});
  const [babyDOB, setBabyDOB] = useState(null);
  const [pregnant, setPregnant] = useState(null);
  const datetimeField = useRef(null);
  let _isMounted = false;

  const uid = getUid();

  goBack = () => {
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

        const exists = (snapshot.val() !== null);
        if (exists || snapshot.exists() || snapshot.val() !== 'undefined') {
          if (_isMounted) {
            setFullName(snapshot.val()?.fullName);
            // setBabyGender({
            //     male: snapshot.val()?.babyGender?.male,
            //     female: snapshot.val()?.babyGender?.female,
            //   }); 
            setPhoneNumber(snapshot.val()?.phoneNumber);
            setPregnant(snapshot.val()?.pregnant);
            setInfant(snapshot.val()?.infant);
            setdob(snapshot.val()?.dob);
            setLiveMiami(snapshot.val()?.liveMiami);
            setBabyDOB(snapshot.val()?.babyDOB);
          }

        }



      });

    } else {
      alert("Error: Couldn't get the user Information");
    }


  };





  onSubmit = (fullName, dob, phoneNumber, infant, pregnant, liveMiami, babyDOB) => {
    Haptics.selectionAsync().then();
    // let male = babyGender.male;
    // let female = babyGender.female;

    //this will give you the week and nextWeek fields for the baby birth day messages
    let babyInfo = getNextWeekAndWeekNo();

    //this is to check whether infant if is male or female 
    // if (male === true) {
    //   female = false;

    // }else if (female === false) {
    //   female = true;

    // } else {
    //   male = false;
    // }

    //this is if the user choose not infant then setup male, female to false and babyDob, week, weekNext to null
    if (infant === false) {
      // male = false;
      // female = false;
      babyDOB = null;
      babyInfo[0] = null;
      babyInfo[1] = null;
    }

    // by default in case the values are undefined or null we set their values to false;
    if (liveMiami === null || liveMiami === 'undefined') {
      liveMiami = false;
    } else if (infant === null || infant === 'undefined') {
      infant = false;
    } else if (pregnant === null || pregnant === 'undefined') {
      pregnant = false;
    }

    if (!fullName || !phoneNumber || !dob) {
      alert(translate("fillOutAllFields"));

    } else {

      firebase.database().ref('users/' + uid).update({
        fullName: fullName,
        phoneNumber: phoneNumber,
        dob: dob,
        infant: infant,
        pregnant: pregnant,
        liveMiami: liveMiami || false,
        babyDOB: babyDOB,
        // babyGender:{
        //   male: male,
        //   female: female
        // },
        nextWeek: babyInfo[0],
        week: babyInfo[1],

      }).catch(err => console.log(err));

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
      <View style={{flexDirection: "row", justifyContent: 'space-between', paddingHorizontal: 25, paddingTop: 40}}>
        <TouchableHighlight
          onPress={goBack}
          underlayColor={"transparent"}
          style={{
            height: appStyles.win.height * 0.04,
            // marginTop: "10%",
            // marginLeft: "5%",
            // marginBottom: '3%',
            width: appStyles.win.width * 0.07,
          }}
        >
          <Image
            style={{
              height: appStyles.win.width * 0.06,
              width: appStyles.win.width * 0.06,
            }}
            source={goBackImg}
          />
        </TouchableHighlight>
          <AntDesign name="logout" size={30} color={appStyles.pinkColor} onPress={() => {
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
            }}>{translate('welcomeSetting')}</Text>
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
          <TouchableHighlight style={appStyles.button.TouchableHighlight} underlayColor={appStyles.blueColor}
            onPress={() => onSubmit(fullName, dob, phoneNumber, infant, pregnant, liveMiami, babyDOB)} >
            <Text style={appStyles.button.text}>{translate("save")}</Text>
          </TouchableHighlight>
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
});

export default SettingScreen;