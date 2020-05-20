import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import "./Login.css";

export default class Login extends Component {
    render() {
        const {
            isAuth
        } = this.props;

        return (
            <div className="Login">
                <div className="loginSection">
                    <div className="test">
                        <h1>Log in</h1>
                        <div className="container">
                            <LoginForm isAuth={isAuth} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}