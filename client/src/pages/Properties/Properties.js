import React, { useState, useEffect } from "react";
import "./Properties.css";
import PropertyItem from "../../components/PropertyItem/PropertyItem";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetch("http://localhost/devenv_holiday_house/api/v1/house.php?p=1", {
      headers: {
        Accept: "application/json",
                "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => {
      setProperties(data.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="Properties">
      {!isLoading ? (
        <div className="property-list">
          {properties && properties.map(property => (
            <PropertyItem
              key={property.house_id}
              property={property}
            />  
          ))}
        </div>

      ) : (
        <p>Loading properties..</p>
      )}

    </div>
  )

  /* properties = () => {
    return this.state.properties.map((property, i) => (
      <div className="property" id={property.house_id} key={property.house_id}>
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
  }; */

  
  
    /* return (
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
    ); */

}
