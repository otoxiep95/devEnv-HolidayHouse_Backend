import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

export default function PropertyForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bedroom, setBedroom] = useState(0);
  const [bathroom, setBathroom] = useState(0);
  const [size, setSize] = useState(0);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postal, setPostal] = useState(0);
  const [pricePrNight, setpricePrNight] = useState(0);
  const [image, setImage] = useState("asdasd.jpg");
 /*  const [houseId, setHouseId] = useState(0);
  const [userId, setUserId] = useState(0); */
  const [error, setError] = useState(null);


  const history = useHistory();


  function handleCreateProperty() {
    fetch("http://localhost/devenv_holiday_house/api/v1/house.php?", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        description: description,
        bedroom: bedroom,
        bathroom: bathroom,
        size: size,
        street: street,
        city: city,
        country: country,
        postal: postal,
        price_per_night: pricePrNight,
        image: image
      })
    })
      .then(res => {
        if (res.ok) {
          history.push("/properties");
        } else {
          throw res;
        }
      })
      .catch(err => {
        err.json().then(body => {
          setError(body.message);
        });
      });
  }

  return (
    <div className="PropertyForm">
      <form className="inputPropertyForm" method="POST" /* enctype="multipart/form-data" */>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          onChange={e => setStreet(e.target.value)}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={e => setCity(e.target.value)}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          onChange={e => setCountry(e.target.value)}
        />
        <input
          type="text"
          name="zip-code"
          placeholder="Zip code"
          onChange={e => setPostal(e.target.value)}
        />
        <input
          type="text"
          name="bedrooms"
          placeholder="Bedrooms"
          onChange={e => setBedroom(e.target.value)}
        />
        <input
          type="text"
          name="bathrooms"
          placeholder="Bathrooms"
          onChange={e => setBathroom(e.target.value)}
        />
        <input
          type="text"
          name="area"
          placeholder="Area size"
          onChange={e => setSize(e.target.value)}
        />
        <input
          type="text"
          name="price"
          placeholder="Price pr. night"
          onChange={e => setpricePrNight(e.target.value)}
        />
        <input
          type="file"
          name="image"
          onChange={e => setImage(e.target.value)}
        />
        <div className="buttonWrapper">
          <button
            type="button"
            className="createPropertyButton"
            onClick={handleCreateProperty}
          >
            Create property
          </button>
        </div>
      </form>
      {error ? <p>{error}</p> : null}
    </div>
  );
}
