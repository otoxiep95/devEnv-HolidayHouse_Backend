import React, { Component } from 'react';
import SignupForm from '../../components/SignupForm/SignupForm';
import "./Signup.css";

export default class Signup extends Component {
    render() {
        return (
            <div className="Signup">
                <div className="section">
                    <h1>Sign up</h1>
                    <div className="container">
                        <SignupForm/>
                    </div>
                </div>
            </div>
        )
    }
}