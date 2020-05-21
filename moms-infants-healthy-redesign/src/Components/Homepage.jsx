import React from 'react';
import Map from "./Map";
import {View} from 'react-native';
import LowerPanel from "./LowerPanel";
import SOSButton from "./SOSButton";
import appStyles from "./AppStyles";
import Clinics from "./Clinics";



export default class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.getCurrentLocation();
    }


    state = {fullPanel: true, clinics: Clinics(), clinicToView: null, lowerPanelContent: 'selection', currentLocation: null};

    getCurrentLocation = () => {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            let currentLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };
            this.setState({currentLocation: currentLocation})
        }, (error) => console.log(error));
    };

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    setFullPanel = (fullPanel) => {
        this.state.fullPanel && !fullPanel ? this.setState({fullPanel: fullPanel}) : null;
        ((!this.state.fullPanel) && fullPanel) ? this.setState({fullPanel: fullPanel}) : null
    };

    setClinicToView = (clinic) => {
        this.setState({clinicToView: clinic})
    };


    setLowerPanelContent = (lowerPanelContent) => {
        this.setState({lowerPanelContent: lowerPanelContent});
    };

    goBack = () => {
        if (this.state.lowerPanelContent === 'selection') return;
        if (this.state.lowerPanelContent === 'findCare') this.setLowerPanelContent('selection');
        if (this.state.lowerPanelContent === 'clinicInfo') this.setLowerPanelContent('findCare');
        if (this.state.lowerPanelContent === 'learn') this.setLowerPanelContent('selection');
        if (this.state.lowerPanelContent === 'tips') this.setLowerPanelContent('selection');
    };


    render() {
        return (
            <View style={appStyles.container}>
                <Map onPress={() => this.setFullPanel(false)}
                      setFullPanel={this.setFullPanel}
                      clinicToView={this.state.clinicToView}
                      setClinicToView={this.setClinicToView}
                      clinics={this.state.clinics}
                      currentLocation={this.state.currentLocation}
                      getLocalizedText={this.props.getLocalizedText}/>
                <SOSButton/>
                <LowerPanel onPress={() => this.setFullPanel(true)}
                            setFullPanel={() => this.setFullPanel(!this.state.fullPanel)}
                            fullPanel={this.state.fullPanel}
                            fullName={this.props.fullName}
                            logout={this.props.logout}
                            clinics={this.state.clinics}
                            clinicToView={this.state.clinicToView}
                            setClinicToView={this.setClinicToView}
                            lowerPanelContent={this.state.lowerPanelContent}
                            goBack={this.goBack}
                            setLowerPanelContent={this.setLowerPanelContent}
                            getLocalizedText={this.props.getLocalizedText}/>
            </View>
        )
    }
}