import React, {useState, useEffect, useRef} from 'react';
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
  const [objects, setObjects] = useState([]);
  const uid = getUid();
  const isMountedRef = useRef(null);
  getAppointment = () => {
    isMountedRef.current = true;
    fetchAppointment(uid, setObjects, isMountedRef.current);
    return () => (isMountedRef.current = false);
  };

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef.current) {
      getAppointment();
    }
    return () => (isMountedRef.current = false);
  }, []);

  removeAppointment = (id, eventId) => {
    deleteAppointment(id, uid, objects, setObjects, eventId);
  };

  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'flex-end', maxWidth: '100%'}}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        style={appStyles.viewPlus}
        onPress={() => {
          props.setLowerPanelContent('NewAppointment');
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
  );
}
