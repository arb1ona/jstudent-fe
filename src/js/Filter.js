import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
    render() {
        const { toggleFilter, handleFilterChange } = this.props;
        return (
            <form className="filter">
                <div className="filterBox">
                    <select id="filterBedrooms" name="filterBedrooms" onChange={(e) => handleFilterChange(e)
                    }>
                        <option value="any">Bedrooms</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div className="filterBox">
                    <select id="filterBathrooms" name="filterBathrooms">
                        <option value="any">Bathrooms</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>
                <div className="filterBox">
                    <select id="filterCars" name="filterCars">
                        <option value="any">Car Spaces</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>
                <div className="filterBox filterFrom">
                    <select id="priceFrom" name="priceFrom">
                        <option value="0">Min Price</option>
                        <option value="500000">{500000}</option>
                        <option value="600000">{600000}</option>
                        <option value="700000">{700000}</option>
                        <option value="800000">{800000}</option>
                        <option value="900000">{900000}</option>
                    </select>
                </div>
                <div className="filterBox">
                    <select id="priceTo" name="priceTo">
                        <option value="1000001">Max Price</option>
                        <option value="600000">{600000}</option>
                        <option value="700000">{700000}</option>
                        <option value="800000">{800000}</option>
                        <option value="900000">{900000}</option>
                        <option value="1000000">{1000000}</option>
                    </select>
                </div>
                <div className="filterBox">
                    <select id="filterSort" name="filterSort">
                        <option value="any">Order by</option>
                        <option value="0">Price: - Low to High</option>
                        <option value="1">Price: - High to Low</option>
                    </select>
                </div>
                <div className="filterBox">
                    <label>&nbsp;</label>
                    <button className="btn-clear">Clear</button>
                </div>
                <button className="btn-filter" onClick={(e) =>
                    toggleFilter(e)
                }><strong>X</strong>Close</button>
                {/* <strong>X</strong><span>Close</span></button> */}
            </form>
        );
    }
}

Filter.propTypes = {
    toggleFilter: PropTypes.func.isRequired,
    handleFilterChange: PropTypes.func.isRequired
};

export default Filter;