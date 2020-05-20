import React, { useState, useEffect } from "react";
import "./Properties.css";
import PropertyItem from "../../components/PropertyItem/PropertyItem";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  /* const [modal, setModal] = useState(false); */
  
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
}
