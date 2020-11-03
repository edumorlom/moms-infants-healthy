import {
  Text,
  TouchableOpacity,
  TextInput as TextBox,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import translate from 'app/Components/getLocalizedText';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import * as Calendar from 'expo-calendar';
import * as Localization from 'expo-localization';
import * as Permissions from 'expo-permissions';
import appStyles from './AppStyles';
import Button from './Button';
import {getUid, addAppointment} from '../Firebase';

export default function NewAppointment(props) {
  appointment = [
    ([name, setName] = useState(null)),
    ([address, setAddress] = useState(null)),
    ([date, setDate] = useState(
      `${moment().format('MM')}/${moment().format('DD')}/${moment().format(
        'YYYY'
      )}`
    )),
    ([time, setTime] = useState(
      `${moment().format('h')}:${moment().format('mm')}`
    )),
    ([extra, setExtra] = useState(null)),
    ([isDatePickerVisible, setDatePickerVisibility] = useState(false)),
    ([isTimePickerVisible, setTimePickerVisibility] = useState(false)),
    ([eventId, setEventId] = useState(null)),
  ];
  const uid = getUid();

  appointmentInfo = {
    name,
    address,
    date,
    time,
    extra,
    eventId,
  };

  onPress = async () => {
    if (!name || !address) {
      alert(translate('fillOutAllFields'));
    } else {
      await SynchronizeCalendar();
      await addAppointment(uid, appointmentInfo);
      props.setLowerPanelContent('Appointment');
    }
  };

  showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  handleConfirm = (date) => {
    const newDate = moment(date).format('MM/DD/YYYY');
    setDate(newDate);
    console.log('A date has been picked: ', newDate);
    hideDatePicker();
  };

  showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  handleConfirmTime = (time) => {
    const newTime = moment(time).format('h:mm a');
    setTime(newTime);
    console.log('A date has been picked: ', newTime);
    hideTimePicker();
  };

  addEventsToCalendar = async (calendardId) => {
    let hours = moment(time, ['HH:mm a', 'h:mm a']).hours();
    let minutes = moment(time, ['HH:mm a', 'h:mm a']).minutes();
    let addHours = moment(time, ['HH:mm a', 'h:mm a']).add(1, 'h').hours();
    let addMinutes = moment(time, ['HH:mm a', 'h:mm a']).add(30, 'm').minutes();

    const event = {
      title: name,
      notes: extra,
      location: address,
      startDate: moment(date, ['MM-DD-YYYY', 'YYYY-MM-DD'])
        .set({hour: hours, minute: minutes})
        .toDate(),
      endDate: moment(date, ['MM-DD-YYYY', 'YYYY-MM-DD'])
        .set({hour: addHours, minute: addMinutes})
        .toDate(),
      timeZone: Localization.timezone,
    };
    try {
      const createEventAsyncRes = await Calendar.createEventAsync(
        calendardId.toString(),
        event
      );
      return createEventAsyncRes;
    } catch (err) {
      console.log(err);
    }
  };

  SynchronizeCalendar = async () => {
    const {status} = await Permissions.askAsync(Permissions.CALENDAR);

    if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync();
      const defaultCalendars = calendars.filter(
        (item) => item.allowsModifications === true
      );

      try {
        const createEventAsyncRes = await addEventsToCalendar(
          defaultCalendars[0].id
        );
        console.log(createEventAsyncRes);
        setEventId(createEventAsyncRes.toString());
      } catch (err) {
        Alert.alert(err.message);
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
        maxWidth: '100%',
      }}
      scrollEnabled
    >
      <View style={appStyles.TextInputAppointment.View}>
        <TextBox
          placeholder={translate('appointmentName')}
          onChangeText={setName}
          value={name}
          style={appStyles.TextInputAppointment.TextInput}
        />
      </View>
      <View style={appStyles.TextInputAppointment.View}>
        <TextBox
          placeholder={translate('appointmentAddress')}
          onChangeText={setAddress}
          value={address}
          style={appStyles.TextInputAppointment.TextInput}
        />
      </View>
      <View style={appStyles.TextInputAppointment.View}>
        <TextBox
          placeholder={translate('appointmentExtra')}
          onChangeText={setExtra}
          value={extra}
          style={appStyles.TextInputAppointment.TextInput}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.textTitle}>{translate('Date')}</Text>
        <TouchableOpacity onPress={showDatePicker}>
          <Text style={styles.textStyle}>{date}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          is24Hour
          headerTextIOS="Pick a date"
        />
      </View>
      <View style={styles.seperator} />
      <View style={styles.container}>
        <Text style={styles.textTitle}>{translate('Time')}</Text>
        <TouchableOpacity onPress={showTimePicker}>
          <Text style={styles.textStyle}>{time}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmTime}
          onCancel={hideTimePicker}
          is24Hour
          headerTextIOS="Pick a time"
        />
      </View>
      <View style={styles.seperator} />
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: appStyles.win.height * 0.05,
        }}
      >
        <Button
          style={appStyles.button}
          text={translate('save')}
          onPress={onPress}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  seperator: {
    height: 0.2,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 8,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: appStyles.win.height * 0.005,
  },
  textTitle: {
    ...Platform.select({
      ios: {
        color: '#9CAAC4',
        fontWeight: '600',
        fontSize: appStyles.regularFontSize - 3,
      },
      android: {
        color: '#9CAAC4',
        fontWeight: '600',
        fontSize: appStyles.regularFontSize - 3,
      },
    }),
  },
  textStyle: {
    ...Platform.select({
      ios: {
        fontSize: 19,
        alignSelf: 'center',
        paddingTop: 5,
      },
      android: {
        fontSize: 19,
        alignSelf: 'center',
        paddingTop: 5,
      },
    }),
  },
});
