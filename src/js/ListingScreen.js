import React, { Component } from 'react';
import Card from './Card';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GoogleMap from './GoogleMap';
import data from './data/Data';
import jump from 'jump.js'
// import { easeInOutCubic } from 'ez.js';


class ListingScreen extends Component {
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
        duration: 2000,
        // offset: 0,
        // callback: undefined,
        // easing: easeInOutCubic
      });
    }
  }

  render() {
    const { properties, activeProperty } = this.state
    return (
      <div>
        <GoogleMap
          activeProperty={activeProperty}
          properties={properties}
          setActiveProperty={this.setActiveProperty}
        />

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

        {/* <GoogleMap
          activeProperty={activeProperty}
          properties={properties}
          setActiveProperty={this.setActiveProperty} /> */}
      </div>


    )
  }
}

export default ListingScreen;