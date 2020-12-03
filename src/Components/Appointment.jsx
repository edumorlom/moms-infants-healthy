import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import AppointmentMenu from './AppointmentMenu';
import appStyles from './AppStyles';
import Plus from '../../assets/plus.png';
import {deleteAppointment, fetchAppointment, getUid} from '../Firebase';

export default function Appointment(props) {
  let _isMounted = false;
  const [objects, setObjects] = useState([]);
  const uid = getUid();

  getAppointment = () => {
    fetchAppointment(uid, setObjects, _isMounted);
  };

  useEffect(() => {
    getAppointment();

    return () => (_isMounted = false);
  }, []);

  removeAppointment = (id, eventId) => {
    deleteAppointment(id, uid, objects, setObjects, eventId);
  };

  return (
    <View style={appStyles.contentContainer}>
      <ScrollView
        contentContainerStyle={{alignItems: 'flex-end', maxWidth: '100%'}}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={appStyles.viewPlus}
          onPress={() => {
            props.navigation.navigate('NewAppointment');
          }}
        >
          <Image source={Plus} style={{height: 25, width: 25}} />
        </TouchableOpacity>
        <View>
          {objects.map((appointments, index) => {
            return (
              <AppointmentMenu
                key={index}
                appointments={appointments}
                removeAppointment={removeAppointment}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
