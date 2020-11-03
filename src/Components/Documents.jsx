import React, {useState, useEffect, useCallback, useRef} from 'react';
import {Image, TouchableOpacity, ScrollView, Linking, View} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import Constants from 'expo-constants';
import * as firebase from 'firebase';
import * as FB from '../Firebase';
import appStyles from './AppStyles';
import SelectionButton from './SelectionButton';
import Plus from '../../assets/plus.png';
import documentIcon from '../../assets/document.png';

export default function Documents() {
  const [image, setImage] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(true);
  const [textChanged, setTextChanged] = useState(false);
  const [value, onChangeText] = useState(null);
  const [buttonClickedStatus, setButtonClickedStatus] = useState(false);
  const [documents, setDocuments] = useState([]);
  const isMountedRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;
    (async () => {
      if (isMountedRef.current) {
        if (Constants.platform.ios | Constants.platform.android) {
          const {
            status,
          } = await ImagePicker.requestCameraRollPermissionsAsync();
          if (status !== 'granted') {
            alert('Permission Needed to Access Files!');
          }
        }
      }
    })();
    return () => (isMountedRef.current = false);
  });

  let onPress = () => {
    Haptics.selectionAsync().then();

    pickImage();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    setIsDialogVisible(true);
    setButtonClickedStatus(true);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  let upload = () => {
    let user = firebase.auth().currentUser;
    FB.uploadImage(image, user, value, documents, setDocuments);
    setTextChanged(false);
  };

  function grabDocuments() {
    let user = firebase.auth().currentUser;
    FB.grabImages(user, documents, setDocuments);
  }

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef.current) {
      grabDocuments();
    }
    return () => (isMountedRef.current = false);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'flex-end', maxWidth: '100%'}}
    >
      <TouchableOpacity
        onPress={() => {
          onPress();
        }}
        style={{...appStyles.viewPlus, marginVertical: 10}}
      >
        <Image source={Plus} style={{height: 25, width: 25}} />
      </TouchableOpacity>
      {documents.map((document, key) => (
        <SelectionButton
          style={appStyles.ImageOnRightSelectionButton}
          key={key}
          icon={documentIcon}
          text={document.name}
          onPress={() => Linking.openURL(document.url)}
        />
      ))}
      {buttonClickedStatus && (
        <DialogInput
          isDialogVisible={isDialogVisible}
          title="Name Your File"
          submitInput={(value) => {
            onChangeText(value),
              setIsDialogVisible(false),
              setTextChanged(true),
              setButtonClickedStatus(false);
          }}
          closeDialog={() => {
            setIsDialogVisible(false);
          }}
        />
      )}
      {textChanged && upload()}
    </ScrollView>
  );
}
