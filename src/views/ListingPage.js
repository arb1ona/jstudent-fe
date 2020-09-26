import React, { Component, useState } from 'react'
import { InfoWindow, withScriptjs, withGoogleMap, GoogleMap, Marker, } from "react-google-maps";
import Geocode from "react-geocode";
import mapStyles from "./mapStyles"
import { Descriptions } from 'antd';
import AutoComplete from 'react-google-autocomplete'


Geocode.setApiKey("AIzaSyB6xHfPLxTArJQQzUVAs2EV6CZG6UT9HCU")

class ListingPage extends Component {

    state = {
        address: "",
        zoom: 15,
        height: 700,
        width: 700,
        mapPosition: {
            lat: 0,
            lng: 0,
        },
        markerPosition: {
            lat: 0,
            lng: 0
        }
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    mapPosition: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    },
                    markerPosition: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                }, () => {
                    Geocode.fromLatLng(position.coords.latitude, position.coords.longitude)
                        .then(response => {
                            console.log('response', response)
                            const address = response.results[0].formatted_address,
                                addressArray = response.results[0].address_components;

                            this.setState({
                                address: (address) ? address : ""

                            })
                        })
                })

            })
        }
    }

    onMarkerDragEnd = (event) => {
        let newLat = event.latLng.lat();
        let newLng = event.latLng.lng();

        // console.log(" newLng", newLng)
        Geocode.fromLatLng(newLat, newLng)
            .then(response => {
                console.log('response', response)
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components;

                this.setState({
                    address: (address) ? address : "",
                    markerPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                    mapPosition: {
                        lat: newLat,
                        lng: newLng
                    }
                })
            })

    }

    onPlaceSelected = (place) => {
        const address = place.formatted_address,
            addressArray = place.address_components,
            newLat = place.geometry.location.lat(),
            newLng = place.geometry.location.lng();

        this.setState({
            address: (address) ? address : "",
            markerPosition: {
                lat: newLat,
                lng: newLng
            },
            mapPosition: {
                lat: newLat,
                lng: newLng
            }
        })

    }


    render() {

        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
                defaultZoom={14}
                options={{ styles: mapStyles.light }}
                defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
            >

                <Marker
                    draggable={true}
                    onDragEnd={this.onMarkerDragEnd}
                    position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                >
                    <InfoWindow>
                        <div>Hello, this is Arbiona!</div>
                    </InfoWindow>
                </Marker>
                <AutoComplete
                    style={{
                        width: '100%',
                        height: '40px',
                        paddingLeft: '16px',
                        marginTop: '2px',
                        marginBottom: '2rem'
                    }}
                    onPlaceSelected={(this.onPlaceSelected)}
                    types={['(regions)']}
                />

            </GoogleMap>
        ));

        return (

            <div style={{ padding: "1rem" }, { margin: "0 auto" }, { maxWidth: " 700px" }}>
                <Descriptions bordered>
                    <Descriptions.Item label="Addres">{this.state.address}</Descriptions.Item>
                </Descriptions>

                <div>
                    <MapWithAMarker
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB6xHfPLxTArJQQzUVAs2EV6CZG6UT9HCU&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: this.state.height, width: this.state.width }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </div >
            </div>
        )
    }
}

export default ListingPage;
