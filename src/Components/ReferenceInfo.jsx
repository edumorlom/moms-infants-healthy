import React, {useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  Alert,
  Linking, 
  Modal
} from "react-native";
import appStyles, { borderRadius, shadow } from "./AppStyles";
import { Feather } from "@expo/vector-icons";
import translate from "./getLocalizedText";
import { AntDesign } from '@expo/vector-icons';
import Button from "./Button";
import Avatar from "../../assets/Avatar-Doctor.jpg";

function ReferenceInfo(props) {
    const { name, phone, email, specialties } = props.references?.val();
    const [modalOpen, setModalOpen] = useState(false);

    AsyncAlert = () => {
      return new Promise((resolve, reject) => {
        Alert.alert(
          translate("RemoveReference"),
          translate("WantToRemoveReference"),
          [
            { text: translate("Yes"), onPress: () => resolve(true) },
            { text: translate("No"), onPress: () => resolve(false) },
          ],
          { cancelable: false }
        );
      });
    };

    let call = () => {
      Linking.openURL('tel:' + phone)
  };

  let sendEmail = () => {
      Linking.openURL('mailto:' + email)
  };
   

  return (
    <TouchableHighlight
    style={{
      margin: 15,
      paddingLeft: 10,
      justifyContent: "center",
      backgroundColor: "white",
      ...shadow,
      width: appStyles.win.width * 0.95,
      borderRadius: borderRadius,
    }}
    
    underlayColor={appStyles.underlayColor}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}
        >
        <View>
        <TouchableHighlight style={{position: "absolute",  bottom: appStyles.win.height * 0.05, left:appStyles.win.height * -0.02  }} underlayColor={appStyles.underlayColor} onPress={() => setModalOpen(true)}>
          <Image source={Avatar} style={styles.iconStyle} />
        </TouchableHighlight>
            <View style={{marginHorizontal: 65}} >
              <Text style={styles.TextName}>{translate("Name")}: {name}</Text>
              <Text style={styles.TextInfo}>{translate("Specialties")}:</Text>
              <Text style={styles.TextInfo}>{specialties}</Text>
              <Text style={styles.TextInfo}>{translate("Phone")}: {phone}</Text>
              <Text style={styles.TextInfo}>{translate("Email")}:</Text>
              <Text style={styles.TextInfo}>{email}</Text>
            </View>
        </View>
        <Modal visible={modalOpen} animationType='fade'>
          <AntDesign name="closecircle" size={30} color="#eb1800" style={styles.modalClose} onPress={() => setModalOpen(false)}/>
          <View style={styles.ModalContent}>
              <Image source={Avatar} style={{...styles.iconStyle, ...styles.modalIcon}} />
              <View style={{paddingTop: 50}}>
                <Text style={{...styles.TextName, ...styles.modalTextName}}>{translate("Name")}: {name}</Text>
                <Text style={{...styles.TextInfo, ...styles.modalTextInfo}}>{translate("Specialties")}:</Text>
                <Text style={{...styles.TextInfo, ...styles.modalTextInfo}}>{specialties}</Text>
                <Text style={{...styles.TextInfo, ...styles.modalTextInfo}}>{translate("Phone")}: {phone}</Text>
                <Text style={{...styles.TextInfo, ...styles.modalTextInfo}}>{translate("Email")}:</Text>
                <Text style={{...styles.TextInfo, ...styles.modalTextInfo}}>{email}</Text>
              </View>
              <View style={{  flexDirection: "row", justifyContent: "center", alignItems: "center", position: "absolute", bottom: appStyles.win.height * 0.12}}>
                <Button
                  style={appStyles.buttonProfile}
                  text={translate("call")}
                  onPress={call}
                />
                 <Button
                  style={appStyles.buttonProfile}
                  text={translate("email")}
                  onPress={sendEmail}
                />
              </View>
          </View>        
        </Modal>
        <TouchableHighlight
          underlayColor='transparent'
          style={{ position: 'absolute', right: appStyles.win.width * 0.05, bottom: appStyles.win.height * 0.07 }}
          onPress={() => {
            AsyncAlert().then((response) => {
              response ? props.removeReference(props.references?.key) : null;
            });
          }}
        >
          <Feather name='trash' size={40} color='#eb1800' />
        </TouchableHighlight>
      </View>
    </TouchableHighlight>
  );
}

export default ReferenceInfo;

const styles = StyleSheet.create({
    TextName: {
        fontWeight: "700",
        fontSize: appStyles.regularFontSize,
        color: appStyles.blueColor
        
    },
    TextInfo: {
      color: appStyles.greyColor,
      fontWeight: "500",
      fontSize: appStyles.regularFontSize - 4,
     
    },
    iconStyle: {
      width: 60,
      height: 60,
      borderRadius: 100,
   

    },
    modalClose: {
      marginTop: 25,
      padding: 10,
      borderRadius: 20,
      alignSelf: 'flex-end',
      marginRight: 15,
      paddingTop: 15
    },
    ModalContent: {
      flex: 1,
      alignItems: 'center'  

    },
    modalIcon: {
      width: 100,
      height: 100,
    },
    modalTextInfo: {
      textAlign: "center",
      paddingVertical: 5,
      fontWeight: "700"
    }
});