import React, {Component, useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {Image} from 'react-native';
import appStyles from './AppStyles';
import Spinner from '../../assets/loading-blue.gif';

export default function LocationsMap(props) {
  const defaultRegion = {
    latitude: 25.782220701733717,
    longitude: -80.26424665653634,
    latitudeDelta: 0.65,
    longitudeDelta: 0.3,
  };
  const [region, setRegion] = useState(defaultRegion);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onMount();
  }, []);

  let onMount = async () => {
    await getLocationAsync();
    setLoading(false);
  };

  // Gets the user location for the Map
  let getLocationAsync = async () => {
    let {status} = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMessage('Permissions not granted.');
    }
    let location = await Location.getCurrentPositionAsync({});
    let loc = location.coords;

    setRegion({
      latitude: loc.latitude,
      longitude: loc.longitude,
      latitudeDelta: 0.2,
      longitudeDelta: 0.3,
    });
  };

  return (
    <>
      {loading ? ( // While loading is true, show a loading gif, until finished loading then show Map
        <Image
          style={{
            height: 100,
            width: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            top: appStyles.win.height * 0.1,
          }}
          source={Spinner}
        />
      ) : (
        <MapView
          ref={(ref) => (mapView = ref)}
          initialRegion={region}
          loadingEnabled
          onPress={props.onPress}
          provider="google"
          showsMyLocationButton
          showsCompass
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            height: appStyles.win.height * 0.3,
          }}
          // initialRegion={ region }
          zoomEnabled
          onRegionChangeComplete={(region) => {
            // setRegion(region);
          }}
          showsUserLocation
        >
          {/* Display markers for each clinic */}
          {props.locations.map((location, index) => (
            <Marker
              key={index}
              coordinate={location.coordinate}
              title={location.resource}
              description={location.phoneNumber}
              pinColor={appStyles.blueColor}
              onPress={(e) => {
                props.navigation.navigate('LocationsInfo', {
                  location,
                });
              }}
            />
          ))}
          {/* Display markers for each shelter */}
        </MapView>
      )}
    </>
  );
}
