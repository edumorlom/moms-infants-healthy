import React, { Component } from 'react';
import MapView, {Marker} from 'react-native-maps';
import appStyles from './AppStyles';
import * as Location from 'expo-location';

export default class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {region: null, errorMessage: null };
        }
        /* this.state = this.props.currentLocation ? { region: {...this.props.currentLocation, latitudeDelta: 0.2, longitudeDelta: 0.3}} : 
                { region: {latitude: 25.782220701733717, longitude: -80.26424665653634, latitudeDelta: 0.65, longitudeDelta: 0.3}}; */
    

    getLocationAsync = async()=> {
        let {status} = await Location.requestPermissionsAsync();
        if(status!=='granted'){
            this.setState({errorMessage:"Permissions not granted."})
        }
        let location = await Location.getCurrentPositionAsync({});
        
        this.setState({region : {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.2,
            longitudeDelta: 0.3,
        }})
        this.mapView.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.2,
            longitudeDelta: 0.3
        }, 400)
        
    }
        
    
    async componentDidMount() {
        await this.getLocationAsync();
        }

        /* getPosition =  (options) => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
    }; */


    render() {
        return (
            <MapView
                ref = {(ref) => this.mapView=ref}
                initialRegion={this.state.region}
                loadingEnabled = {true}
                onPress={this.props.onPress}
                provider="google"
                showsMyLocationButton={true}
                showsCompass={true}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    height: appStyles.win.height * 0.5
                }}
                //initialRegion={ this.state.region }
                zoomEnabled={true}
                onRegionChangeComplete={region => {
                    this.setState({region});
                }}
                showsUserLocation={true}
                >
                {this.props.clinics.map((clinic, index) => (
                    <Marker
                        key={index}
                        coordinate={clinic.coordinate}
                        title={clinic.resource}
                        description={clinic.phoneNumber}
                        onPress={(e) => {e.stopPropagation(); this.props.setClinicToView(clinic)}}
                        />))}

            </MapView>
        );
    }
}