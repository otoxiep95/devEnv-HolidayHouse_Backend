import React, { useState, useEffect } from "react";
import "./Properties.css";
import PropertyItem from "../../components/PropertyItem/PropertyItem";
import { SyncLoader } from "react-spinners";

export default function Properties(history) {
  const [properties, setProperties] = useState([]);
  const [property, setProperty] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [header, setHeader] = useState("Properties");

  async function fetchProperty(id) {
    setModal(true);
    await fetch(
      `http://localhost/devenv_holiday_house/api/v1/house.php?id=${id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        setProperty(data.data);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    // SEARCH FETCH
    if (
      history.location.state &&
      history.location.state.passedSearchTerm.length > 2
    ) {
      const passedSearchTerm = history.location.state.passedSearchTerm;
      fetch(
        `http://localhost/devenv_holiday_house/api/v1/house.php?search=${passedSearchTerm}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
        .then(res => res.json())
        .then(data => {
          setProperties(data.data);
          setIsLoading(false);

          //console.log(data.data);
          if (data.data.length === 0) {
            console.log(data);
            setHeader("No properties found");
            //document.querySelector('#property-header').innerHTML = "No properties found";
          }
        });
    } else {
      // NORMAL FETCH
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
    }
  }, []);

  return (
    <div className="Properties">
      {!isLoading ? (
        <>
          {modal && (
            <div className="modal-container" onClick={() => setModal(false)}>
              <div className="modal">
                <span onClick={() => setModal(false)}>X</span>
                <div
                  className="img"
                  style={{
                    background: `url(/user_uploads/img/normal/${property.image}) no-repeat center center`,
                    backgroundSize: "cover"
                  }}
                ></div>
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
          )}
          <h1>{header}</h1>
          <div className="property-list">
            {properties &&
              properties.map(property => (
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
          <SyncLoader
            className="loader"
            loading={isLoading}
            color={"#b07acd"}
          />
        </div>
      )}
    </div>
  );
}
