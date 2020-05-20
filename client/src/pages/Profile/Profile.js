import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import "./Profile.css";

export default function Profile() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();

    const history = useHistory();

    function fetchUser() {
        fetch("http://localhost/devenv_holiday_house/api/v1/user.php", {
            credentials: "include",
            headers: {
                Accept: "application/json",
                        "Content-Type": "application/json"
            }
        })
        .then(res => {
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
    }

    useEffect(() => {
        fetchUser();
    }, [])
    
    return (
        <div className="Profile">
            <div className="section">
                {!isLoading ? (
                    <>
                        <h1>Hi {user.first_name}.</h1>
                        <div className="container">
                            <form>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={user.first_name}
                                />
                                <input
                                    type="text"
                                    name="last_name"
                                    value={user.last_name}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    value={user.phone}
                                />
                                <button>Update profile</button>
                            </form>
                        </div>
                    </>
                ) : (
                    <p>Loading profile...</p>
                )}
            </div>
        </div>
    )
}