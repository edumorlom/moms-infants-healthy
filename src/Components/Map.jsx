import React, { Component, useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import appStyles from "./AppStyles";
import * as Location from "expo-location";
import { Image } from "react-native";
import Spinner from "../../assets/loading-blue.gif";

export default function Map(props) {
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

  //Gets the user location for the Map
  let getLocationAsync = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMessage("Permissions not granted.");
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
      {loading ? ( //While loading is true, show a loading gif, until finished loading then show Map
        <Image
          style={{
            height: 100,
            width: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            top: appStyles.win.height * 0.1,
          }}
          source={Spinner}
        />
      ) : (
        <MapView
          ref={(ref) => (mapView = ref)}
          initialRegion={region}
          loadingEnabled={true}
          onPress={props.onPress}
          provider="google"
          showsMyLocationButton={true}
          showsCompass={true}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            height: appStyles.win.height * 0.5,
          }}
          //initialRegion={ region }
          zoomEnabled={true}
          onRegionChangeComplete={(region) => {
            //setRegion(region);
          }}
          showsUserLocation={true}
        >
          {/* Display markers for each clinic */}
          {props.clinics.map((clinic, index) => (
            <Marker
              key={index}
              coordinate={clinic.coordinate}
              title={clinic.resource}
              description={clinic.phoneNumber}
              pinColor={appStyles.blueColor}
              onPress={(e) => {
                e.stopPropagation();
                props.setClinicToView(clinic);
                props.setLowerPanelContent("clinicInfo");
              }}
            />
          ))}
          {/* Display markers for each shelter */}
          {props.shelters.map((shelter, index) => (
            <Marker
              key={index}
              coordinate={shelter.coordinate}
              title={shelter.resource}
              description={shelter.phoneNumber}
              pinColor={appStyles.pinkColor}
              onPress={(e) => {
                e.stopPropagation();
                props.setShelterToView(shelter);
                props.setLowerPanelContent("shelterInfo");
              }}
            />
          ))}
        </MapView>
      )}
    </>
  );
}
