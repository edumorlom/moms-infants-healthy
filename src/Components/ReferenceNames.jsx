import React, {useState, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity, Image} from 'react-native';
import appStyles from './AppStyles';
import Plus from '../../assets/plus.png';
import ReferenceInfo from './ReferenceInfo';
import {deleteReference, fetchReference, getUid} from '../Firebase';

function ReferenceNames(props) {
  let _isMounted = false;
  const [references, setReferences] = useState([]);
  const uid = getUid();

  getReferences = () => {
    fetchReference(uid, setReferences, _isMounted);
  };

  removeReference = (id) => {
    deleteReference(id, uid, references, setReferences);
  };

  useEffect(() => {
    getReferences();

    return () => (_isMounted = false);
  }, []);

  return (
    <View style={appStyles.contentContainer}>
      <ScrollView
        contentContainerStyle={{alignItems: 'flex-end', maxWidth: '100%'}}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={appStyles.viewPlus}
          onPress={() => {
            props.navigation.navigate('AddReferenceNames');
          }}
        >
          <Image source={Plus} style={{height: 25, width: 25}} />
        </TouchableOpacity>
        <View>
          {references.map((references, index) => {
            return (
              <ReferenceInfo
                key={index}
                references={references}
                removeReference={removeReference}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

export default ReferenceNames;
