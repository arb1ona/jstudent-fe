import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ property, activeProperty, setActiveProperty }) => {
  const { address, bathrooms, bedrooms, carSpaces, city, index, picture, price, name } = property;

  return (
    <div id={`card-${index}`} className={`card col-sm-12 col-md-6 col-lg-6 ${property === activeProperty ? 'is-active' : ''}`} onClick={() => setActiveProperty(property, false)}>
      <img src={picture} alt={city} />

      <h5><b>{name}</b></h5>
      <div className="details">
        {/* <span className="index">{index + 1}</span> */}
        <p className="location">
          {address},{city}
        </p>
        <ul className="features">
          <li className="icon-bed">{bedrooms}<span>bedrooms</span></li>
          <li className="icon-bath">{bathrooms}<span>bathrooms</span></li>
          <li className="icon-car">{carSpaces}<span>parking spots</span></li>
          <span className="price">ALL {price}<span>/month</span></span>
        </ul>
      </div>
    </div>)
}

Card.propTypes = {
  property: PropTypes.object.isRequired,
  activeProperty: PropTypes.object.isRequired,
  setActiveProperty: PropTypes.func
}

export default Card;
