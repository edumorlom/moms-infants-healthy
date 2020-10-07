import React, {useState, useEffect} from 'react';
import {ScrollView, View, StyleSheet} from "react-native";
import SelectionButton from "./SelectionButton";
import clinicLogo from '../../assets/clinic-logo.png';
import {Dropdown} from "react-native-material-dropdown-v2"
import appStyles, {borderRadius, greyColor, shadow} from "./AppStyles";
import translate from "./getLocalizedText";

export default function FindCare(props) {
    const [dist, setDist] = useState(props.filters[0]);
    const [service, setService] = useState(props.filters[1]);

    useEffect(() => {
        //This runs on every re-render
        setDist(props.filters[0]);
        setService(props.filters[1])
    } )

    //props.filterToShow

    let getResourceName = (name) => {
        return name.length > 40
        ? name.substring(0, 40) + "..."
        : name;
      }

    let window = appStyles.win;

    let clinicsButtons = props.clinics.map((clinic, key) =>
        <SelectionButton 
            style={appStyles.ClinicSelectionButton}
            key={key}
            text={getResourceName(clinic.resource)}
            subtext={clinic.address.street + '\n' + clinic.address.city + '\n' + clinic.address.state + ', ' + clinic.address.zipCode + '\n' + clinic.distance + ' miles'}
            icon={clinicLogo}
            onPress={() => {
            props.setClinicToView(clinic);
            props.setLowerPanelContent('clinicInfo');
            }}
            /* clinic={clinic} */
            />);

    let clinics = props.sortedClinics;
                               
    //Filters clinics based on the two filters passed
    let filterClinics = (distance, service) => {
        if (distance !== 10000 && clinics) {  //if distance filter is not default value
            clinics = clinics.filter(function (clinic) {  //filter by distance
                return clinic.distance <= distance;
            });
        }
        
        if (service !== 'All' && clinics) { //if service filter is not default value
            clinics = clinics.filter((clinic) => clinic.services.includes(service))  //filter by service
        }
        //Update the states with the new info
        props.setClinics(clinics);
        props.setFilters([distance, service]);
        setDist(distance);
        setService(service);
    }

    let servicesArray = ["All", "Education", "Support & Counseling", "Free Materials", "Referrals", "STD Tests", "STD Treatment", "Yearly Exam", "Pregnancy Tests", "Ultrasound", "Immunization", "Abortions", "Medical Care", "Lab services"];
    
    let services = servicesArray.map ((service) => 
        ({label: translate(service), value: service})) //Creates an array of dropdown data

    let distances = [ {label: translate('All'),value: 10000}, {label: ('5 '+ translate('Miles')),value: 5.5}, 
    {label: ('10 '+ translate('Miles')),value: 10.5}, {label: ('15 '+ translate('Miles')),value: 15.5}, {label: ('20 '+ translate('Miles')),value: 20.5} ]



    return (
        //The <> tag is shorthand for React.Fragment <= look it up
        <>
            {props.filterToShow &&    //If filter set to show, display the filter dropdown
            <View style={{flexDirection: "row", height: window.height * 0.03}}>
                { <Dropdown containerStyle= {{...styles.Dropdown, right: '30%'}} dropdownOffset= {{top: 0, bottom: 0, left: 0}} pickerStyle= {styles.Picker} inputContainerStyle={{ borderBottomColor: 'transparent'}} textAlign= "center" itemTextStyle= {{alignSelf: 'center'}} fontSize= {12} data={distances} label={translate("Distance")} value= {dist}  useNativeDriver={true} onChangeText={(value,index,data) => filterClinics(value, service)} /> }

                <Dropdown containerStyle= {{...styles.Dropdown, left: '30%'}}  dropdownOffset= {{top: 0, bottom: 0,left: 0}} pickerStyle= {styles.Picker} inputContainerStyle={{ borderBottomColor: 'transparent'}}  textAlign= "center" itemTextStyle= {{alignSelf: 'center'}} fontSize= {12} data={services} label= {translate("services")} value= {service} useNativeDriver={true} onChangeText={(value,index,data)=>filterClinics(dist, value)} />
            </View> }
                <ScrollView contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}>
                    
                    {clinicsButtons}
                </ScrollView>
       </>
    )
}

const styles = StyleSheet.create({
    Dropdown: {
        backgroundColor: 'white',
        ...shadow,
        borderColor: greyColor,
        borderRadius: 5,
        width: '42%',
        bottom: 5
    },
    Picker: {
        backgroundColor: 'white',
        ...shadow,
        borderColor: greyColor,
        borderRadius: 15,
    }
});

