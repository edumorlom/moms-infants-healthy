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
    'First dose Hepatitis B',
    'First dose diphtheria, tetanus, and pertussis (Dtap)',
    'First dose polio (IPV)',
    'First dose haemophilus influenzae Type B (Hib)',
    'First dose pneumococcal vaccine (PCV)',
    'First dose rotavirus',
    'Second dose Hepatitis B',
    'Third dose Hepatitis B',
    'Second dose diphtheria, tetanus, and pertussis (Dtap)',
    'Second dose polio (IPV)',
    'Second dose haemophilus influenzae Type B (Hib)',
    'Second dose pneumococcal vaccine (PCV)',
    'Second dose rotavirus',
    'Third dose diphtheria, tetanus, and pertussis (Dtap)',
    'Third dose polio (IPV)',
    'Third dose haemophilus influenzae Type B (Hib)',
    'Third dose pneumococcal vaccine (PCV)',
    'Third dose rotavirus',
    'Flu vaccine',
    'Fourth dose Hepatitis B',
    'First dose Hepatitis A',
    'First dose Measles, mumps, and rubella (MMR)',
    'First dose Chickenpox (Varicella)',
    'Fourth dose haemophilus influenzae Type B (Hib)',
    'Fourth dose pneumococcal vaccine (PCV)',
    'Second dose Hepatitis A',
    'Fourth dose diphtheria, tetanus, and pertussis (Dtap)',
    'Fourth dose polio (IPV)',
    'Second dose Measles, mumps, and rubella (MMR)',
    'Second dose Chickenpox (Varicella)',
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
      props.navigation.navigate('ImmunizationScreen');
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
      <View style={styles.container}>
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
          itemTextStyle={{alignSelf: 'left'}}
          fontSize={26}
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
    width: '100%',
    paddingTop: '5%',
    borderRadius: 5,
  },
  Picker: {
    backgroundColor: 'white',
    ...shadow,
    borderColor: greyColor,
    borderRadius: 15,
    alignSelf: 'center',
    width: '90%',
  },
  seperator: {
    height: 0.1,
    width: '80%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 6,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: appStyles.win.height * 0.03,
    width: '80%',
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
