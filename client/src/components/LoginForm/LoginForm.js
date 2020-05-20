import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
export default function LoginForm(props) {

  const {
    setIsAuth
  } = props;

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const history = useHistory();
  
  function handleLogin() {
    fetch("http://localhost/devenv_holiday_house/api/v1/auth.php", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => {
        if (res.ok) {
          setIsAuth(true);
          history.push("/properties");
        } else {
          throw res;
        }
      })
      .catch(err => {
        err.json().then(body => {
          setError(body.response);
        });
      });
  }
  

    return (
      <div className="LoginForm">
        <form method="POST">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
          <button type="button" onClick={handleLogin}>
            Log in
          </button>
          {error ? <p>{error}</p> : null}
        </form>
      </div>
    );
}

/* export default withRouter(LoginForm); */
