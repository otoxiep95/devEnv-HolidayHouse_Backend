import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import "./Navbar.css";
import logo from "../../images/logo.svg"

export default class Navbar extends Component {
    render() {
        
        const {
            isAuth
        } = this.props;

        return(
            <div className="Navbar">
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
                                    <NavLink exact to="/logout" activeClassName="selected">
                                        Logout
                                    </NavLink>
                                </li>
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
}
