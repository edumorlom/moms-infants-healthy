import React from "react";
import Map from "./Map";
import { View, AsyncStorage } from "react-native";
import LowerPanel from "./LowerPanel";
import SOSButton from "./SOSButton";
import appStyles from "./AppStyles";
import Clinics from "./Clinics";
import { getPreciseDistance } from "geolib";
import CancelFilterButton from "./CancelFilterButton";

export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullPanel: true,
      clinics: Clinics(),   //try making it null at the start
      sortedClinics: null,
      filters: [10000, 'All'],   //Default filters (10000 represents infinity distance)
      clinicToView: null,
      STDToView: null,
      lowerPanelContent: "selection",
    };
    this.getPosition = this.getPosition.bind(this) 
  }

  getPosition =  (options) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  async componentDidMount() {
    //All the logic for clinic sorting is here, for no particular reason other than I want the updated clinics ASAP
    //Consider moving this logic inside a Component that handles clinic sorting, filtering and such
    this.getPosition()
      .then((position) => {
        let clinics = Clinics();
        clinics.forEach((clinic) => {
          let dist = getPreciseDistance(clinic.coordinate, {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });   //Returns a precise distance between the two coordinates given (Clinic & User)

          let distanceInMiles = Number(((dist / 1000) * 0.621371).toFixed(2));  //Convertion from meters to miles with 2 decimal places 
          clinic.distance = distanceInMiles;
        });
        clinics.sort((a, b) => {
          return a.distance - b.distance;
        });
        this.setState({ clinics: clinics});  
        this.setState({ sortedClinics: clinics }); //SortedClinics never changed, where as clinics does get filtered
      })
      .catch((err) => {
        console.error(err.message);
      });
  }



  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

  setClinics = (clinics) => {
    this.setState({ clinics: clinics });
  }

  setFullPanel = (fullPanel) => {
    this.state.fullPanel && !fullPanel
      ? this.setState({ fullPanel: fullPanel })
      : null;
    !this.state.fullPanel && fullPanel
      ? this.setState({ fullPanel: fullPanel })
      : null;
  };

  setClinicToView = (clinic) => {
    this.setState({ clinicToView: clinic });
  };
  setSTDToView = (std) => {
    this.setState({ STDToView: std });
  };
  setLowerPanelContent = (lowerPanelContent) => {
    this.setState({ lowerPanelContent: lowerPanelContent });
  };

  setFilters = (distance, service) => {
    this.setState({filters: [distance, service]})
  } 

  goBack = () => {
    if (this.state.lowerPanelContent === "selection") return;
    if (this.state.lowerPanelContent === "findCare")
      this.setLowerPanelContent("selection");
    if (this.state.lowerPanelContent === "clinicInfo")
      this.setLowerPanelContent("findCare");
    if (this.state.lowerPanelContent === "learn")
      this.setLowerPanelContent("selection");
    if (this.state.lowerPanelContent === "STDSelection")
      this.setLowerPanelContent("learn");
    if (this.state.lowerPanelContent === "resources")
      this.setLowerPanelContent("selection");
    if (this.state.lowerPanelContent === "STDInfo")
      this.setLowerPanelContent("STDSelection");
    if (this.state.lowerPanelContent === "Appointment")
      this.setLowerPanelContent("resources");
    if (this.state.lowerPanelContent === "NewAppointment")
      this.setLowerPanelContent("Appointment");
    if (this.state.lowerPanelContent === "documents")
      this.setLowerPanelContent("documents");
  };

  render() {
    //Clinics().forEach(clinic => console.log(clinic.services))
    //console.log(this.state.clinics[0].services)
    return (
      <View style={appStyles.container}>
        <Map
          onPress={() => this.setFullPanel(false)}
          setFullPanel={this.setFullPanel}
          clinicToView={this.state.clinicToView}
          setClinicToView={this.setClinicToView}
          clinics={this.state.clinics}
          getLocalizedText={this.props.getLocalizedText}
        />
        {/* Compare current filters with default filters, is different show reset filter button */}
        {JSON.stringify(this.state.filters) !== JSON.stringify([10000, 'All']) && <CancelFilterButton  resetFilters= {() => {this.setClinics(this.state.sortedClinics); this.setFilters(...[10000, 'All'])}}/>}
        {/*<SOSButton />*/}
        <LowerPanel 
          setFullPanel={() => this.setFullPanel(!this.state.fullPanel)}
          fullPanel={this.state.fullPanel}
          fullName={this.props.fullName}
          logout={this.props.logout}
          clinics={this.state.clinics}
          sortedClinics = {this.state.sortedClinics}
          clinicToView={this.state.clinicToView}
          STDToView={this.state.STDToView}
          setSTDToView={this.setSTDToView}
          setClinicToView={this.setClinicToView}
          setClinics = {this.setClinics}
          filters = {this.state.filters}
          setFilters = {this.setFilters}
          lowerPanelContent={this.state.lowerPanelContent}
          goBack={this.goBack}
          setLowerPanelContent={this.setLowerPanelContent}
          getLocalizedText={this.props.getLocalizedText}
          setAppState={this.props.setAppState}
        />
      </View>
    );
  }
}
