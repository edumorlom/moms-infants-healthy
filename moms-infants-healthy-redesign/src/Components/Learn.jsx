import React from 'react';
import {ScrollView} from "react-native";
import SelectionButtonImageOnRight from "./ClinicSelectionButton";
import clinicLogo from '../../assets/clinic-logo.png'
import Resources from './Resources'
import LearnSelectionButton from "./LearnSelectionButton";




export default function Learn(props) {

    let resourceButtons = Resources().map((resource, key) =>
        <LearnSelectionButton key={key}
                                     icon={resource.icon}
                                     onPress={() => {
                                         props.setClinicToView(clinicLogo);
                                         props.setLowerPanelContent('clinicInfo');
                                     }} resource={resource}/>);

    return (
        <ScrollView contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}>
            {resourceButtons}
        </ScrollView>
    )
}