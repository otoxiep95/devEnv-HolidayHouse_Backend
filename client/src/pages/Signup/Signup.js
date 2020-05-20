import React from 'react';
import SignupForm from '../../components/SignupForm/SignupForm';
import "./Signup.css";

export default function Signup() {
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