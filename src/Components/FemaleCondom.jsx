import React, {useState, useEffect} from 'react';
import {TouchableHighlight, Text, View, ScrollView, Image} from 'react-native';
import translate from 'app/Components/getLocalizedText';
import appStyles from './AppStyles';
import SelectionButton from './SelectionButton';
import BetterMenu from './BetterMenu';
import FemaleCondomImg from '../../assets/FemaleCondom.png';

/* Serves to gather all the text for the Do's and Don'ts section
 * @return array list of condom do's and don'ts
 */
function femaleCondomDoDontList() {
  return [
    {
      dodont: 'FemaleCondomDo1',
    },
    {
      dodont: 'FemaleCondomDo2',
    },
    {
      dodont: 'FemaleCondomDo3',
    },
    {
      dodont: 'FemaleCondomDo4',
    },
    {
      dodont: 'FemaleCondomDo5',
    },
    {
      dodont: 'FemaleCondomDont1',
    },
    {
      dodont: 'FemaleCondomDont2',
    },
    {
      dodont: 'FemaleCondomDont3',
    },
  ];
}

/* Displays the taken list from femaleCondomDoDontList
 * @return formatted View of content from list
 */
function FemaleCondomDoDont() {
  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}
    >
      <Text
        style={{
          fontSize: appStyles.regularFontSize + 2,
          justifyContent: 'center',
          color: appStyles.blueColor,
          fontWeight: 'bold',
        }}
      >
        {translate('FemaleCondomDoDont')}
      </Text>

      {femaleCondomDoDontList().map((fcdd, key) => (
        <BetterMenu
          style={appStyles.FemaleCondomMenu}
          key={key}
          text={translate(fcdd.dodont)}
        />
      ))}
    </ScrollView>
  );
}

/* Serves to gather all the steps for the How to Insert and Remove a Female Condom section
 * @return array list of female condom procedure
 */
function femaleCondomStepsList() {
  return [
    {
      step: 'FemaleCondomStep1',
      icon: require('../../assets/FCStep1.jpg'),
    },
    {
      step: 'FemaleCondomStep2',
      icon: require('../../assets/FCStep2.jpg'),
    },
    {
      step: 'FemaleCondomStep3',
      icon: require('../../assets/FCStep3.jpg'),
    },
    {
      step: 'FemaleCondomStep4',
      icon: require('../../assets/FCStep4.jpg'),
    },
    {
      step: 'FemaleCondomStep5',
      icon: require('../../assets/FCStep5.jpg'),
    },
    {
      step: 'FemaleCondomStep6',
      icon: require('../../assets/FCStep6.jpg'),
    },
    {
      step: 'FemaleCondomStep7',
      icon: require('../../assets/FCStep7.jpg'),
    },
    {
      step: 'FemaleCondomStep8',
      icon: require('../../assets/FCStep8.jpg'),
    },
  ];
}

/* Serves to display all the steps in order and their respective images
 * @return formatted view of content from femaleCondomStepsList
 */
function FemaleCondomSteps() {
  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}
    >
      <Text
        style={{
          fontSize: appStyles.regularFontSize + 1,
          justifyContent: 'center',
          color: appStyles.blueColor,
          fontWeight: 'bold',
          textAlign: 'center',
          paddingBottom: 15,
        }}
      >
        {translate('FemaleCondomHowTo')}
      </Text>

      {femaleCondomStepsList().map((fcs, key) => (
        <BetterMenu
          style={appStyles.FemaleCondomMenuImage}
          key={key}
          text={translate(fcs.step)}
          icon={fcs.icon}
        />
      ))}
    </ScrollView>
  );
}

/* Main Screen selection for Female Condom, which shows the options for Do's and Dont's, and Insertion and removal etc.
 * @return formatted view of the FemaleCondomSteps and FemaleCondomDoDont
 */
function FemaleCondomMainScreen(props) {
  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}
    >
      <Image
        style={{justifyContent: 'center', width: 300, height: 140}}
        source={FemaleCondomImg}
      />
      <Text
        style={{
          fontSize: appStyles.regularFontSize - 5,
          justifyContent: 'center',
          paddingHorizontal: 20,
          paddingBottom: 5,
          paddingTop: 5,
        }}
      >
        {translate('WhatIsFemaleCondom')}
      </Text>

      <SelectionButton
        style={appStyles.STDFemaleCondomSelectionButton}
        text={translate('FemaleCondomDoDont')}
        onPress={() => {
          props.getNextScreen(1);
        }}
      />
      <SelectionButton
        style={appStyles.STDFemaleCondomSelectionButton}
        text={translate('FemaleCondomHowTo')}
        onPress={() => {
          props.getNextScreen(2);
        }}
      />
    </ScrollView>
  );
}

/* Controls which content is viewed and when
 * @return the appropriate screen to view, whether from a backPress or buttonPress
 */
export default function FemaleCondom(props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < 0) {
      props.setLowerPanelContent('FemaleCondomMain');
    }
  });

  let getNextScreen = (value) => {
    setIndex(value);
  };

  let screens = [
    <FemaleCondomMainScreen getNextScreen={getNextScreen} />,

    <FemaleCondomDoDont getNextScreen={getNextScreen} />,
    <FemaleCondomSteps getNextScreen={getNextScreen} />,
  ];
  return <ScrollView style={{height: '100%'}}>{screens[index]}</ScrollView>;
}
