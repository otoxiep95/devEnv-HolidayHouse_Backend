import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function SignupForm() {

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);

    const history = useHistory();

    function handleSignup() {
        fetch("http://localhost/devenv_holiday_house/api/v1/user.php", {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
                    "Content-Type": "application/json"
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            email: email,
            password: password,
            confirm_password: confirmPassword
          })
        })
        .then(res => {
            if (res.ok) {
                history.push("/login");
            } else {
              throw res;
            }
        })
        .catch(err => {
            err.json().then(body => {
              console.log(body);
              setError(body.message);
            });
        });
    }

    return (
        <div className="SignupForm">
            <form method="POST">
                <input 
                    type="text" 
                    name="first_name" 
                    placeholder="First name"
                    onChange={e => setFirstName(e.target.value)}
                />
                <input 
                    type="text" 
                    name="last_name" 
                    placeholder="Last name"
                    onChange={e => setLastName(e.target.value)}
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                /> 
                <input 
                    type="text" 
                    name="phone" 
                    placeholder="Phone number"
                    onChange={e => setPhone(e.target.value)}
                /> 
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                /> 
                <input 
                    type="password" 
                    name="confirm_password" 
                    placeholder="Repeat Password"
                    onChange={e => setConfirmPassword(e.target.value)}
                /> 
                <button type="button" onClick={handleSignup}>Sign up</button>
            </form>
            {error ? <p>{error}</p> : null}
        </div>
    )
}