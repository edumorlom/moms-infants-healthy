import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import WelcomeUserBanner from './WelcomeUserBanner';
import GestureRecognizer from "react-native-swipe-gestures";



const EdditScreen = (props) => {

    //console.log("this is props of Edit Section:", props);
    const [name, setName] = useState(props.fullName);
    const [email, setEmail] = useState(props.email);
    const [password, setPassword] = useState(props.password);



    return (
        <View style={{flex:1}}>
            <ScrollView>
            <GestureRecognizer >
              <WelcomeUserBanner fullName={props.fullName} logout={props.logout} getLocalizedText={props.getLocalizedText}/>
                <Text style={styles.label}>Enter New Name</Text>
                    <TextInput 
                    value={name}
                    style={styles.input}
                    onChangeText={(newNamefull) => setName(newNamefull)}
                    />
                <Text style={styles.label}>Enter New Email</Text>
                    <TextInput 
                    value={email}
                    style={styles.input}
                    onChangeText={(newEmail) => setEmail(newEmail)}
                    />  
                <Text style={styles.label}>Enter New Password</Text>
                    <TextInput 
                    value={password}
                    style={styles.input}
                    onChangeText={(newPassword) => setPassword(newPassword)}
                    />

                <Button title="Save" onPress={() => window.alert('your info has been save!')} />
            </GestureRecognizer>
            </ScrollView>    
        </View>
    )
}

EdditScreen.defaultProps = {
    props: {
        fullName: '',
        email: '',
        password: '',
    }
}

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 15,
        padding: 5,
        margin: 5,
    },

    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5,
    }
});


export default EdditScreen;