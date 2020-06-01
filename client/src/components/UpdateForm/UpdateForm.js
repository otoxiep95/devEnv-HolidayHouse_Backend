import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

export default function UpdateForm(props) {
    console.log(props)

  const [error, setError] = useState(null);


  const history = useHistory();

  /* function handleUpdateProperty() {
    console.log(property.house_id)

    fetch("http://localhost/devenv_holiday_house/api/v1/house.php", {
      method: "PATCH",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        house_id: property.house_id,
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
        console.log(res)
        console.log(property)
      })
      .catch(err => {
        err.json().then(body => {
          setError(body.message);
        });
      });
  } */

  return (
    <div className="PropertyForm">
    {/*   <form className="inputPropertyForm">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={street}
          onChange={e => setStreet(e.target.value)}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={country}
          onChange={e => setCountry(e.target.value)}
        />
        <input
          type="text"
          name="zip-code"
          placeholder="Zip code"
          value={postal}
          onChange={e => setPostal(e.target.value)}
        />
        <input
          type="text"
          name="bedrooms"
          placeholder="Bedrooms"
          value={bedroom}
          onChange={e => setBedroom(e.target.value)}
        />
        <input
          type="text"
          name="bathrooms"
          placeholder="Bathrooms"
          value={bathroom}
          onChange={e => setBathroom(e.target.value)}
        />
        <input
          type="text"
          name="area"
          placeholder="Area size"
          value={size}
          onChange={e => setSize(e.target.value)}
        />
        <input
          type="text"
          name="price"
          placeholder="Price pr. night"
          value={pricePrNight}
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
                className="updatePropertyButton"
                onClick={handleUpdateProperty}
            >
                Update property
            </button>
        </div>
      </form>
      {error ? <p>{error}</p> : null} */}
    </div>
  );
}
