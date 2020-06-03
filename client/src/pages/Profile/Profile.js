import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import "./Profile.css";
import PropertyItemProfile from "../../components/PropertyItemProfile/PropertyItemProfile";

export default function Profile(props) {
  const { setIsAuth } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  //fetch user properties state
  const [properties, setProperties] = useState([]);

  //update user states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const history = useHistory();

  // Image upload
  const [image, setImage] = useState(null);

  function getUserProperties() {
    console.log(image);
    fetch("http://localhost/devenv_holiday_house/api/v1/house.php?user=1", {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          history.push("/");
          return false;
        } else {
          return res.json();
        }
      })
      .then(data => {
        if (data) {
          console.log(data.data);
          setProperties(data.data);
        }
      });
  }

  function updateUser() {
    fetch("http://localhost/devenv_holiday_house/api/v1/user.php", {
      method: "PATCH",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone
      })
    })
      .then(res => {
        if (res.status === 403) {
          return history.push("/");
        } else {
          return res.json();
        }
      })
      .then(data => {
        console.log(data);
        setSuccessMessage("Profile updated");
      })
      .catch(err => {
        err.json().then(body => {
          setError(body.message);
        });
      });
  }

  function deleteUser() {
    fetch("http://localhost/devenv_holiday_house/api/v1/user.php", {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log(res);
        if (res.status === 403) {
          return history.push("/");
        }
        if (res.ok) {
          setIsAuth(false);
          return history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
        err.json().then(body => {
          setError(body.message);
        });
      });
  }

  function deleteProperty(house_id) {
    console.log("hi");
    fetch("http://localhost/devenv_holiday_house/api/v1/house.php", {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        house_id: house_id
      })
    }).then(res => {
      if (res.ok) {
        const index = properties.findIndex(
          property => property.house_id === house_id
        );
        const newProperties = [...properties];
        newProperties.splice(index, 1);
        setProperties(newProperties);
      }
    });
  }

  // Upload image to backend
  /*   function uploadImage() {
    let formData = new FormData();
    formData.append("img", image);
    fetch("http://localhost/devenv_holiday_house/api/v1/image.php", {
      credentials: "include",
      method: "POST",
      headers: {
        // Accept: "application/json"
        // "Content-Type": "application/json"  -> DO NOT SET CONTENT TYPE WHEN FILES ARE INVOLVED!
      },
      body: formData
    })
      .then(res => {
        console.log(res);
        return res.text();
      })
      .then(data => {
        console.log(data);
      });
  } */

  useEffect(() => {
    fetch("http://localhost/devenv_holiday_house/api/v1/user.php", {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          history.push("/");
          return false;
        } else {
          return res.json();
        }
      })
      .then(data => {
        if (data) {
          data = data.data;
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setEmail(data.email);
          setPhone(data.phone);
          setIsLoading(false);
        }
      });

    getUserProperties();
  }, [history]);

  return (
    <div className="Profile">
      {!isLoading ? (
        <>
          <div className="profile-section">
            <h1>Hi {firstName}.</h1>
            <div className="container">
              <form>
                <label>First name</label>
                <input
                  type="text"
                  name="first_name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
                <label>Last name</label>
                <input
                  type="text"
                  name="last_name"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <label>Phone number</label>
                <input
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
                <div>
                  <button type="button" onClick={updateUser}>
                    Update profile
                  </button>
                  <button type="button" onClick={deleteUser}>
                    Delete profile
                  </button>
                </div>
              </form>
              {error ? <p>{error}</p> : null}
              {successMessage ? <p>{successMessage}</p> : null}
            </div>
            <div className="container">
              <h2>Properties</h2>
              {properties &&
                properties.map(property => (
                  <PropertyItemProfile
                    key={property.house_id}
                    property={property}
                    deleteProperty={deleteProperty}
                  />
                ))}
              {!properties.length && <p>You have no properties yet</p>}
            </div>
          </div>
        </>
      ) : (
        <div className="loading">
          <SyncLoader className="loader" loading={isLoading} color={"#ffff"} />
        </div>
      )}
    </div>
  );
}
