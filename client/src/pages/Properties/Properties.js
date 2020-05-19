import React, { Component } from "react";
import "./Properties.css";

export default class Properties extends Component {
  state = {
    properties: [],
    isLoading: true
  };

  componentDidMount() {
    fetch("http://localhost/devenv_holiday_house/api/v1/house.php?p=1", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          properties: res.data,
          isLoading: false
        });
      });
  }

  properties = () => {
    return this.state.properties.map((property, i) => (
      <div className="property" key={property.house_id}>
        <div>
          <div className="img"></div>
        </div>
        <div className="propertyInfo">
          <div className="propertyGeneral">
            <h3>${property.price_per_night}</h3>
            <p>{property.bedroom} bds</p>
            <p>{property.bathroom} ba</p>
            <p>{property.size} sqm</p>
          </div>
          <div className="propertyAddress">
            <p>
              {property.street}, {property.city}, {property.country}
            </p>
          </div>
        </div>
      </div>
    ));
  };

  render() {
    return (
      <div className="Properties">
        <h1>Properties</h1>
        {this.props.location.state && (
          <div>
            <p>{this.props.location.state.passedzipcode} ZIPCODE</p>
          </div>
        )}
        <div className="property-list">
          {!this.state.isLoading ? this.properties() : <p>Loading...</p>}
        </div>
      </div>
    );
  }
}
