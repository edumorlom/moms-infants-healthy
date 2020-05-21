import React, { Component } from 'react';
import MapView, {Marker} from 'react-native-maps';

export default class Map extends Component {

    constructor(props) {
        super(props);
        if (this.props.currentLocation) this.setState({currentRegion: {...this.props.currentLocation, latitudeDelta: 0.3, longitudeDelta: 0.3}})
        
        }
        state = {
            region: {latitude: 25.209346556969518, longitude: -80.26424665653634, latitudeDelta: 0.683801011055472, longitudeDelta: 0.9419280637272891}
            }
    
        

    

    render() {
        return (
            <MapView
                //region={this.state.region}
                onPress={this.props.onPress}
                provider="google"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                }}
                initialRegion={
                    this.state.region 
                  }
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
                        onPress={() => this.props.setClinicToView(clinic)}
                        />))}

            </MapView>
        );
    }
}