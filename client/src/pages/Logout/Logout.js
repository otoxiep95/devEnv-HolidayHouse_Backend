import React from 'react';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


export default function Logout(props) {
    
    const {
        setIsAuth
    } = props;

    const history = useHistory();

    function handleLogOut() {
        fetch("http://localhost/devenv_holiday_house/api/v1/auth.php", {
            method: "DELETE",
            credentials: "include",
            headers: {
                Accept: "application/json",
                        "Content-Type": "application/json"
            }
        })
        .then(res => {
            if (res.ok) {
                setIsAuth(false);
                history.push("/");
            } else {
                throw res;
            }
        })
        .catch(err => {
            console.log("unable to log out")
        });
    }

    return (
        <li onClick={handleLogOut}>
            <NavLink to="/logout" activeClassName="selected"> 
                Log out              
            </NavLink>
        </li>
    )
}