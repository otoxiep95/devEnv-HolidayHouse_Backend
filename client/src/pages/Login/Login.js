import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import "./Login.css";

export default function Login(props) {
    const {
        setIsAuth
    } = props;

    return (
        <div className="Login">
            <div className="loginSection">
                <div className="test">
                    <h1>Log in</h1>
                    <div className="container">
                        <LoginForm setIsAuth={setIsAuth} />
                    </div>
                </div>
            </div>
        </div>
    )
}