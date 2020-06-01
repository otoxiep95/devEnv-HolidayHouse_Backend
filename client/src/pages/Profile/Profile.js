import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import "./Profile.css";

export default function Profile(props) {
  const { setIsAuth } = props;

  //fetch user states
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();

  //update user states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  const history = useHistory();

  // Image upload
  const [image, setImage] = useState(null);

  /* function fetchUser() {
        fetch("http://localhost/devenv_holiday_house/api/v1/user.php", {
            credentials: "include",
            headers: {
                Accept: "application/json",
                        "Content-Type": "application/json"
            }
        })
        .then(res => {
            console.log("res", res)
            if(res.status === 401) {
                return history.push("/")
            } else {
                return res.json();
            }
        })
        .then(data => {
            setUser(data.data);
            setIsLoading(false);
        })
    } */

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
        if (res.status === 401) {
          return history.push("/");
        } else {
          return res.json();
        }
      })
      .then(data => {
        console.log(data);
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
        if (res.status === 401) {
          return history.push("/");
        }
        if (res.ok) {
          //   setIsAuth(false);
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

  // Upload image to backend
  function uploadImage() {
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
  }

  useEffect(() => {
    fetch("http://localhost/devenv_holiday_house/api/v1/user.php", {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log("res", res);
        if (res.status === 401) {
          return history.push("/");
        } else {
          return res.json();
        }
      })
      .then(data => {
        setUser(data.data);
        setIsLoading(false);
      });
  }, [history]);

  return (
    <div className="Profile">
      {!isLoading ? (
        <>
          <div className="profile-section">
            <h1>Hi {user.first_name}.</h1>
            <div className="container">
              <form>
                <label>First name</label>
                <input
                  type="text"
                  name="first_name"
                  defaultValue={user.first_name}
                  onChange={e => setFirstName(e.target.value)}
                />
                <label>Last name</label>
                <input
                  type="text"
                  name="last_name"
                  defaultValue={user.last_name}
                  onChange={e => setLastName(e.target.value)}
                />
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={user.email}
                  onChange={e => setEmail(e.target.value)}
                />
                <label>Phone number</label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={user.phone}
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
            </div>
            <div className="container">
              <h2>Properties</h2>
              <h4>Upload image</h4>
              <form
                encType="multipart/form-data"
                style={{ border: "1px solid black", margin: "10px" }}
              >
                <img
                  src="assets/images/property-placeholder.jpg"
                  alt=""
                  className="placeholder"
                />
                <div className="form-content">
                  <p className="top">Upload an image of the property</p>
                  <input
                    type="file"
                    name="img"
                    className="img-file"
                    onChange={e => setImage(e.target.files[0])}
                  />
                  <button type="button" onClick={uploadImage}>
                    Upload
                  </button>
                </div>
              </form>
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
