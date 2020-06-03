import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./UpdateProperty.css";

export default function UpdateProperty(props) {
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
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const history = useHistory();

  function handleUpdateProperty() {
    const house_id = props.match.params.id;
    const json = JSON.stringify({
      house_id: house_id,
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
    });
    let formData = new FormData();
    formData.append("img", image);
    formData.append("json", json);
    formData.append("method", "PATCH");
    fetch("http://localhost/devenv_holiday_house/api/v1/house.php", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json"
      },
      body: formData
    })
      .then(res => {
        console.log(res.ok);
        if (res.ok) {
          history.push("/profile");
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

  useEffect(() => {
    const id = props.match.params.id;
    fetch(`http://localhost/devenv_holiday_house/api/v1/house.php?id=${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        data = data.data;
        setTitle(data.title);
        setDescription(data.description);
        setBedroom(data.bedroom);
        setBathroom(data.bathroom);
        setSize(data.size);
        setStreet(data.street);
        setCity(data.city);
        setCountry(data.country);
        setPostal(data.postal);
        setpricePrNight(data.price_per_night);
        setImage(null);
        setIsLoading(false);
      });
    console.log(isLoading);
  }, []);

  return (
    <div className="UpdateProperty">
      <div className="section">
        <h1>Update property</h1>
        <div className="container">
          <form className="inputPropertyForm">
            <label>
              {" "}
              Title
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </label>
            <label>
              {" "}
              Description
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </label>
            <label>
              {" "}
              Street
              <input
                type="text"
                name="street"
                placeholder="Street"
                value={street}
                onChange={e => setStreet(e.target.value)}
              />
            </label>
            <label>
              {" "}
              City
              <input
                type="text"
                name="city"
                placeholder="City"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
            </label>
            <label>
              {" "}
              Country
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={country}
                onChange={e => setCountry(e.target.value)}
              />
            </label>
            <label>
              Postal code
              <input
                type="text"
                name="zip-code"
                placeholder="Zip code"
                value={postal}
                onChange={e => setPostal(e.target.value)}
              />
            </label>
            <label>
              {" "}
              Bedrooms
              <input
                type="text"
                name="bedrooms"
                placeholder="Bedrooms"
                value={bedroom}
                onChange={e => setBedroom(e.target.value)}
              />
            </label>
            <label>
              {" "}
              Bathrooms
              <input
                type="text"
                name="bathrooms"
                placeholder="Bathrooms"
                value={bathroom}
                onChange={e => setBathroom(e.target.value)}
              />
            </label>
            <label>
              {" "}
              Area size
              <input
                type="text"
                name="size"
                placeholder="Size"
                value={size}
                onChange={e => setSize(e.target.value)}
              />
            </label>
            <label>
              {" "}
              Price pr. night
              <input
                type="text"
                name="price"
                placeholder="Price pr. night"
                value={pricePrNight}
                onChange={e => setpricePrNight(e.target.value)}
              />
            </label>
            <div className="image-area">
              <label>Upload image</label>
              <input
                type="file"
                name="image"
                onChange={e => setImage(e.target.files[0])}
              />
            </div>
            <div className="buttonWrapper">
              <button
                type="button"
                className="propertyButton"
                onClick={handleUpdateProperty}
              >
                Update property
              </button>
            </div>
          </form>
          {error ? <p>{error}</p> : null}
        </div>
      </div>
    </div>
  );
}
