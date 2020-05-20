import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../../images/logo.svg"
import "./Navbar.css";
import Logout from '../../pages/Logout/Logout';

export default function Navbar(props) {
        
    const {
        isAuth,
        setIsAuth
    } = props;

    return (
        <div className={isAuth ? "Navbar auth" : "Navbar"}>
            <nav>
                <ul>
                    <li>
                        <img src={logo} alt="" />
                    </li>
                    <li>
                        <NavLink exact to="/" activeClassName="selected">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/properties" activeClassName="selected">
                            Properties
                        </NavLink>
                    </li>
                    {isAuth ? (
                        <>
                            <li>
                                <NavLink exact to="/create-property" activeClassName="selected">
                                    Create property
                                </NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/profile" activeClassName="selected">
                                    Profile
                                </NavLink>
                            </li>
                            <Logout setIsAuth={setIsAuth}/>
                        </>

                    ) : (
                        <>
                            <li>
                                <NavLink exact to="/login" activeClassName="selected">
                                    Log in
                                </NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/signup" activeClassName="selected">
                                    Sign up
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );

}
