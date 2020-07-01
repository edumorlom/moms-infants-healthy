import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Button, Image } from "react-native";
import AppointmentMenu from "./AppointmentMenu";
import * as firebase from 'firebase';
import Spinner from "../../assets/dna-loading2.gif";
import appStyles from './AppStyles';



export default function Appointment(props) {
  let _isMounted = false;
  const [objects, setObjects] = useState([])
  const [loading, setLoading] = useState(true);


  const getAppointment = async () => {

    let uid = firebase.auth().currentUser.uid;
    _isMounted = true;


    if (uid !== null) {
      console.log("User id >>>>>>>>>: " + uid);
      await firebase.database().ref('users/' + uid + '/appointments/').once('value', (snapshot) => {

        snapshot.forEach(function (childSnapshot) {
          let childKey = childSnapshot.key;
          let childData = childSnapshot.val();
          console.log(childKey);
          console.log(childData);

          if (childSnapshot.val() !== null || childSnapshot.val() !== 'undefined') {
            if (_isMounted) {

              setObjects(prevArray => [...prevArray, childSnapshot]);
              setLoading(false);

            }

          }

        });

      });


    } else {
      alert("Error: Couldn't get the Appointment Info");
    }

  }




  useEffect(() => {
    getAppointment();

    if(!objects.length){
      setLoading(null);
    }


    return () => _isMounted = false;


  }, []);


  const deleteAppointment = (id) => {
    let uid = firebase.auth().currentUser.uid;
    console.log("ID>>>:", id);
    const currentObject = objects;


    if (uid !== null) {

      console.log("UPDATE OBJECT>>:", currentObject.filter((item) => item.key !== id));
      setObjects(currentObject.filter((item) => item.key !== id));

      firebase.database().ref('users/' + uid + '/appointments/' + id).remove();

      // alert("Your appointment has been removed.")

    } else {
      console.log("Error: Couldn't get the User appointment Info")
    }

  }


  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "flex-end", maxWidth: "100%" }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Button
          title={props.getLocalizedText("wantNewAppointment")}
          onPress={() => {
            props.setLowerPanelContent("NewAppointment");
          }}
        />
      </View>
      <View >
        {loading ? <Image
          style={{
            height: 200,
            width: 200,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            top: appStyles.win.height * 0.06
          }}
          source={Spinner}
        /> : objects.map((appointments, index) => {
          return (
            <AppointmentMenu
              key={index}
              appointments={appointments}
              deleteAppointment={deleteAppointment}
              getLocalizedText={props.getLocalizedText} />
          )
        })}
      </View>
    </ScrollView>
  );
}