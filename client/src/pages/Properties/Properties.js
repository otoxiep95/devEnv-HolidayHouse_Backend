import React, { useState, useEffect } from "react";
import "./Properties.css";
import PropertyItem from "../../components/PropertyItem/PropertyItem";
import { SyncLoader } from 'react-spinners';
import Home from "../Home/Home.js";

export default function Properties(history) {
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
        setProperty(data.data)
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetch("http://localhost/devenv_holiday_house/api/v1/house.php", {
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

  // SEARCH
  useEffect(() => {
    if (history.location.state !== null) {
      const passedSearchTerm = history.location.state.passedSearchTerm;

      if (passedSearchTerm.length > 3) {
        fetch(`http://localhost/devenv_holiday_house/api/v1/house.php?search=${passedSearchTerm}`, {
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
      }
    }
  }, []);


  // SEARCH
  if (history.location.state !== null) {
    const passedSearchTerm = history.location.state.passedSearchTerm;
    if (passedSearchTerm.length > 3) {
      console.log(passedSearchTerm);
    }
  }
  return (
    <div className="Properties">
      {!isLoading ? (
        <>
          {modal &&
            <div className="modal-container" onClick={() => setModal(false)}>
              <div className="modal">
                <span onClick={() => setModal(false)}>X</span>
                <div className="img">
                </div>
                <div>
                  <h2>{property.title}</h2>
                  <p>{property.description}</p>
                  <h3>Bedrooms</h3>
                  <p>{property.bedroom}</p>
                  <h3>Bathrooms</h3>
                  <p>{property.bathroom}</p>
                  <h3>Size</h3>
                  <p>{property.size} sqm</p>
                </div>
              </div>
            </div>
          }
          {/* {passedSearchTerm && passedSearchTerm} */}
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
          <div className="loading">
            <SyncLoader className="loader" loading={isLoading} color={"#b07acd"} />
          </div>
        )}
    </div>
  )
}
