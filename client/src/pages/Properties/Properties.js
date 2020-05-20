import React, { useState, useEffect } from "react";
import "./Properties.css";
import PropertyItem from "../../components/PropertyItem/PropertyItem";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [property, setProperty] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);


  async function fetchProperty(id) {
    setModal(true);
    await fetch(`http://localhost/devenv_holiday_house/api/v1/house.php?id=${id}`, {
      headers: {
        Accept: "application/json",
                "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.data)
      setProperty(data.data)
      setIsLoading(false);
    });
  }
  
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
        <>
        {modal && 
          <div className="modal-container" onClick={() => setModal(false)}>
            <div className="modal">
              <div>
                <img></img>
              </div>
              <span onClick={() => setModal(false)}>X</span>
              <h2>{property.title}</h2>
              <p>{property.description}</p>
            </div>
          </div>
        }
        <div className="property-list">
          {properties && properties.map(property => (
            <PropertyItem
              key={property.house_id}
              property={property}
              fetchProperty={fetchProperty}
            />  
          ))}
        </div>
      </>
      ) : (
        <p>Loading properties..</p>
      )}
    </div>
  )
}
