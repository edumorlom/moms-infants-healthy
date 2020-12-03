import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import appStyles, {borderRadius, shadow} from './AppStyles';
import {fetchImmunization, getUid} from '../Firebase';

export default function ImmunizationSchedule() {
  let _isMounted = false;
  const [objects, setObjects] = useState([]);
  const uid = getUid();

  getImmunization = () => {
    fetchImmunization(uid, setObjects, _isMounted);
  };

  useEffect(() => {
    getImmunization();
    return () => (_isMounted = false);
  }, []);

  let scheduleData = [
    {
      age: 'Birth',
      immunizations: [
        {
          id: '1HEPB',
          name: 'First dose Hepatitis B',
        },
      ],
    },
    {
      age: '2 Months',
      immunizations: [
        {
          id: '1DTAP',
          name: 'First dose diphtheria, tetanus, and pertussis (Dtap)',
        },
        {
          id: '1IPV',
          name: 'First dose polio (IPV)',
        },
        {
          id: '1HIB',
          name: 'First dose haemophilus influenzae Type B (Hib)',
        },
        {
          id: '1PCV',
          name: 'First dose pneumococcal vaccine (PCV)',
        },
        {
          id: '1RV',
          name: 'First dose rotavirus',
        },
        {
          id: '2HEPB',
          name: 'Second dose Hepatitis B',
        },
      ],
    },
    {
      age: '4 Months',
      immunizations: [
        {
          id: '3HEPB',
          name: 'Third dose Hepatitis B',
        },
        {
          id: '2DTAP',
          name: 'Second dose diphtheria, tetanus, and pertussis (Dtap)',
        },
        {
          id: '2IPV',
          name: 'Second dose polio (IPV)',
        },
        {
          id: '2HIB',
          name: 'Second dose haemophilus influenzae Type B (Hib)',
        },
        {
          id: '2PCV',
          name: 'Second dose pneumococcal vaccine (PCV)',
        },
        {
          id: '2RV',
          name: 'Second dose rotavirus',
        },
      ],
    },
    {
      age: '6 Months',
      immunizations: [
        {
          id: '3DTAP',
          name: 'Third dose diphtheria, tetanus, and pertussis (Dtap)',
        },
        {
          id: '3IPV',
          name: 'Third dose polio (IPV)',
        },
        {
          id: '3HIB',
          name: 'Third dose haemophilus influenzae Type B (Hib)',
        },
        {
          id: '3PCV',
          name: 'Third dose pneumococcal vaccine (PCV)',
        },
        {
          id: '3RV',
          name: 'Third dose rotavirus',
        },
        {
          id: 'FLU',
          name: 'Flu vaccine',
        },
        {
          id: '4HEPB',
          name: 'Fourth dose Hepatitis B',
        },
      ],
    },
    {
      age: '12 Months',
      immunizations: [
        {
          id: '1HEPA',
          name: 'First dose Hepatitis A',
        },
        {
          id: '1MMR',
          name: 'First dose Measles, mumps, and rubella (MMR)',
        },
        {
          id: '1CHKPOX',
          name: 'First dose Chickenpox (Varicella)',
        },
      ],
    },
    {
      age: '15 Months',
      immunizations: [
        {
          id: '4HIB',
          name: 'Fourth dose haemophilus influenzae Type B (Hib)',
        },
        {
          id: '4PCV',
          name: 'Fourth dose pneumococcal vaccine (PCV)',
        },
      ],
    },
    {
      age: '18 Months',
      immunizations: [
        {
          id: '2HEPA',
          name: 'Second dose Hepatitis A',
        },
      ],
    },
    {
      age: '4 to 6  Years',
      immunizations: [
        {
          id: '4DTAP',
          name: 'Fourth dose diphtheria, tetanus, and pertussis (Dtap)',
        },
        {
          id: '4IPV',
          name: 'Fourth dose polio (IPV)',
        },
        {
          id: '2MMR',
          name: 'Second dose Measles, mumps, and rubella (MMR)',
        },
        {
          id: '2CHCKPOX',
          name: 'Second dose Chickenpox (Varicella)',
        },
      ],
    },
  ];

  displayCheckBox = (immunizations, scheduleData) => {
    let types = immunizations.map((item) => {
      const {type} = item?.val();
      if (type === scheduleData) return type;
      return undefined;
    });
    if (types.includes(scheduleData)) {
      return <Image source={require('../../assets/checked.png')} />;
    }
    return <Image source={require('../../assets/unchecked.png')} />;
  };

  return (
    <View style={appStyles.contentContainer}>
      <ScrollView
        contentContainerStyle={{alignItems: 'flex-end', maxWidth: '100%'}}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {scheduleData.map((value) => {
            return (
              <TouchableHighlight
                style={{
                  margin: 15,
                  paddingLeft: 10,
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  ...shadow,
                  width: appStyles.win.width * 0.95,
                  borderRadius,
                }}
                underlayColor={appStyles.underlayColor}
              >
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: appStyles.blueColor,
                        fontSize: appStyles.regularFontSize + 1,
                        fontWeight: 'bold',
                      }}
                    >
                      {value.age}
                    </Text>
                    {value.immunizations.map((item, index) => (
                      <ListItem
                        key={index}
                        bottomDivider
                        style={{
                          margin: 15,
                          width: appStyles.win.width * 0.7,
                        }}
                      >
                        {displayCheckBox(objects, item.name)}
                        <ListItem.Content>
                          <ListItem.Title
                            style={{
                              color: appStyles.greyColor,
                              fontSize: appStyles.regularFontSize - 3,
                            }}
                          >
                            {item.name}
                          </ListItem.Title>
                        </ListItem.Content>
                      </ListItem>
                    ))}
                  </View>
                </View>
              </TouchableHighlight>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  seperator: {
    height: 0.1,
    width: '70%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 8,
  },
  container: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  checkBoxImage: {
    height: 40,
    width: 40,
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
