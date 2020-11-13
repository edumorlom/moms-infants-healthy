import {
  Text,
  TouchableOpacity,
  TextInput as TextBox,
  View,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Dropdown} from 'react-native-material-dropdown-v2';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import translate from './getLocalizedText';
import Button from './Button';
import appStyles, {greyColor, shadow} from './AppStyles';
import {getUid, addImmunization} from '../Firebase';

export default function NewImmunization(props) {
  immunization = [
    ([type, setType] = useState(null)),
    ([date, setDate] = useState(
      `${moment().format('MM')}/${moment().format('DD')}/${moment().format(
        'YYYY'
      )}`
    )),
    ([notes, setNotes] = useState(null)),
    ([isDatePickerVisible, setDatePickerVisibility] = useState(false)),
  ];
  const uid = getUid();
  immunizationInfo = {
    type,
    date,
    notes,
  };

  let immunizationArray = [
    '<<Select Immunization>>',
    'DTaP',
    'Hepatitis A',
    'Hepatitis B',
    'Hib',
    'Influenza(yearly)',
    'MMR ',
    'Pneumococcal(PCV13)',
    'Pneumococcal(PCV7)',
    'Pneumococcal(PCV23)',
    'Polio(IPV)',
    'Polio(OPV)',
    'Rotavirus(RV)',
    'Varicella/Zoster',
    'Other',
  ];

  let immunizations = immunizationArray.map((immunization) => ({
    label: translate(immunization),
    value: immunization,
  }));

  onPress = async () => {
    if (!type || !date || type === '<<Select Immunization>>') {
      alert(translate('fillOutAllFields'));
    } else {
      await addImmunization(uid, immunizationInfo);
      props.setLowerPanelContent('Immunization');
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

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
        maxWidth: '100%',
      }}
      scrollEnabled
    >
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={styles.textTitle}>{translate('ImmunizationType')}</Text>
        <Dropdown
          containerStyle={{
            ...styles.Dropdown,
          }}
          pickerStyle={{
            ...styles.Picker,
          }}
          inputContainerStyle={{borderBottomColor: 'transparent'}}
          textAlign="center"
          itemCount={8}
          itemTextStyle={{alignSelf: 'center'}}
          fontSize={24}
          data={immunizations}
          label={translate(immunizations)}
          value={immunizations[0].value}
          useNativeDriver
          onChangeText={(value, index, data) => setType(value)}
        />
      </View>
      <View style={appStyles.TextInputImmunization.View}>
        <TextBox
          placeholder={translate('immunizationNotes')}
          onChangeText={setNotes}
          value={notes}
          multiline
          numberOfLines={8}
          style={appStyles.TextInputImmunization.TextInput}
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
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: appStyles.win.height * 0.1,
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
  Dropdown: {
    backgroundColor: 'white',
    borderColor: greyColor,
    alignSelf: 'center',
    width: '100%',
    paddingTop: '5%',
    borderRadius: 5,
  },
  Picker: {
    backgroundColor: 'white',
    ...shadow,
    // borderColor: greyColor,
    borderRadius: 15,
    alignSelf: 'center',
    width: '70%',
  },
  seperator: {
    height: 0.1,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 8,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: appStyles.win.height * 0.02,
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
