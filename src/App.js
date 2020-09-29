import React, { Component, useState } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow, StreetViewPanorama } from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import mapStyles from "./mapStyles"



const libraries = ["places"];
const mapContainerStyle = {
  width: "50vw",
  height: "100vh"
}
const center = {
  lat: 41.3275,
  lng: 19.8187
}
const options = {
  styles: mapStyles.light,
  disableDefaultUI: true,
  zoomControl: true
}


function App() {
  const [markers, setMarkers] = React.useState([]);   //Adding Markers via onClick
  const { isLoaded, loadError } = useLoadScript({ // this hook gives us back 2variables to know when our googlescript is righty so we can know to work with it 
    googleMapsApiKey: "AIzaSyB6xHfPLxTArJQQzUVAs2EV6CZG6UT9HCU",
    libraries,
  })
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
        onClick={(event) => {
          setMarkers(current => [...current, {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date(),
          }])
        }}
      >
        {markers.map(marker =>
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: '/placeholder.svg',
              scaledSize: new window.google.maps.Size(50, 50),
              // origin: new window.google.maps.Point(0, 0),
              // anchor: new window.google.maps.Point(25, 25) to center the point-marker

            }}
          />)}

      </GoogleMap>
    </div>
  )
}

export default App
