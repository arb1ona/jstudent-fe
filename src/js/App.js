import React, { Component } from 'react';
import image from '../images/house-location-pin.svg';
import Card from './Card';
import GoogleMap from './GoogleMap';
import data from './data/Data';
import jump from 'jump.js';
import { easeInOutCubic } from './utils/Easing';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      properties: data.properties,
      activeProperty: data.properties[0]
    }

    this.setActiveProperty = this.setActiveProperty.bind(this);
  }

  setActiveProperty(property, scroll) {
    const { index } = property;
    this.setState({
      activeProperty: property,
    });

    //only scroll if we click on the pin, not the card
    if (scroll) {
      // scroll to the right property
      const target = `#card-${index}`;
      jump(target, {
        duration: 800,
        easing: easeInOutCubic
      });
    }
  }

  render() {
    const { properties, activeProperty } = this.state
    return (
      <div>
        {/* listings - Start */}
        <div className="listings">

          {/* Header - Start - add .filter-is-visible to show filter*/}

          {/* Header - End */}

          <div className="cards container">
            <div className="cards-list row ">
              {
                properties.map(property => {
                  return <Card
                    activeProperty={activeProperty}
                    key={property._id}
                    property={property}
                    setActiveProperty={this.setActiveProperty}
                  />
                })
              }
            </div>
          </div>
        </div>
        {/* listings - End */}
        <GoogleMap
          activeProperty={activeProperty}
          properties={properties}
          setActiveProperty={this.setActiveProperty} />
      </div>
    )
  }
}

export default App;