/*global google*/
import React from 'react';
import PropTypes from 'prop-types';
import mapStyles from "./mapStyles";

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: []
    }
  }

  componentDidUpdate(nextProps) {
    const { activeProperty } = nextProps;
    const { index } = activeProperty;

    this.hideAll();

    this.showInfoWindow(index);
  }

  showInfoWindow(index) {
    const { markers } = this.state;
    markers[index] && markers[index].infoWindow.open(this.map, markers[index]);
  }

  hideAll() {
    const { markers } = this.state;
    markers.forEach(marker => {
      marker.infoWindow.close();
    })
  }

  componentDidMount() {
    const { properties, activeProperty, options } = this.props;
    const { latitude, longitude } = activeProperty;

    this.map = new google.maps.Map(this.map, {
      options: {
        disableDefaultUI: true,
        zoomControl: true,
        styles: mapStyles,

      },
      center: { lat: latitude, lng: longitude },
      mapTypeControl: true,
      zoom: 14
    });

    this.createMarkers(properties);
  }

  createMarkers(properties) {
    const { markers } = this.state;
    const { setActiveProperty, activeProperty } = this.props;
    const activePropertyIndex = activeProperty.index;

    properties.map(property => {
      const { address, index, latitude, longitude, city, picture } = property;
      this.marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: this.map,
        // label: {
        //   color: '#ffffff',
        //   text: `${index + 1}`
        // },
        icon: {
          url: 'https://svgshare.com/i/QBj.svg',
          scaledSize: new google.maps.Size(50, 40),
          origin: new google.maps.Point(0, 0),
          //anchor: new google.maps.Point(0, 30),
        }
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<div><img style='width: 13rem; height:10rem' src=${picture}></div>`
        // content: `<div style='float:left'><img src=${picture}></div><div style='float:right; padding: 10px;'><b>Title</b><br/>${address}<br/>${city}</div>`
      })

      this.marker.infoWindow = infoWindow;

      this.marker.addListener('click', function () {

        //hide all other info boxes on click
        this.hideAll()

        // set active property ono the state
        setActiveProperty(property, true);
      }.bind(this)); // important to bind this

      // push this marker to the markers array on the state
      markers.push(this.marker);

      //show active property info window
      this.showInfoWindow(activePropertyIndex);
    })
  }

  render() {
    return (
      <div className="mapContainer">
        <div id="map" ref={(el) => this.map = el}></div>
      </div>
    )
  }
}

GoogleMap.propTypes = {
  properties: PropTypes.array.isRequired,
  activeProperty: PropTypes.object.isRequired,
  setActiveProperty: PropTypes.func.isRequired,
}

export default GoogleMap;
