import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import "./Profile.css";

export default function Profile(props) {
  const { setIsAuth } = props;

  //fetch user states
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();

  //fetch user properties state
  const [properties, setProperties] = useState([]);

  //update user states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  const history = useHistory();

  
  function getUserProperties() {
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
        console.log(data.data)
        setProperties(data.data)
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
  

  useEffect(() => {
    fetch("http://localhost/devenv_holiday_house/api/v1/user.php", {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        /* console.log("res", res); */
        if (!res.ok) {
           history.push("/");
           return false;
        } else {
          return res.json();
        }
      })
      .then(data => {
        if (data) {
          data = data.data
          console.log("user", data)
            setFirstName(data.first_name)
            setLastName(data.last_name)
            setEmail(data.email)
            setPhone(data.phone)
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
            </div>
            <div className="container">
              <h2>Properties</h2>
              {properties && properties.map(property => 
                <div key={property.house_id}>
                  <h3>{property.title}</h3>
                  <span>Created at: date</span>
                  <div className="img">
                  </div>
                  <button>Update</button>
                  <button>Delete</button>
                </div>
              )}
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
