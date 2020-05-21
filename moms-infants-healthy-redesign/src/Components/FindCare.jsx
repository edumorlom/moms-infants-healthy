import React from 'react';
import {ScrollView} from "react-native";
import SelectionButtonImageOnRight from "./ClinicSelectionButton";
import clinicLogo from '../../assets/clinic-logo.png'
import Resources from './Resources.js'




export default function FindCare(props) {

    let clinicsButtons = props.clinics.map((clinic, key) =>
        <SelectionButtonImageOnRight key={key}
                                     icon={clinicLogo}
                                     onPress={() => {
                                        props.setClinicToView(clinic);
                                        props.setLowerPanelContent('clinicInfo');
                                     }}
                                     clinic={clinic}/>);

    return (
        <ScrollView contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}>
            {clinicsButtons}
        </ScrollView>
    )
}