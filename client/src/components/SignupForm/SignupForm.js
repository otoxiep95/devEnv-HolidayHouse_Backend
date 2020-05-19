import React, { Component } from 'react';

export default class SignupForm extends Component {
    render() {
        return (
            <div className="SignupForm">
                <form method="POST">
                    <input type="text" name="first-name" placeholder="First name"/>
                    <input type="text" name="last-name" placeholder="Last name"/>
                    <input type="email" name="email" placeholder="Email"/> 
                    <input type="text" name="phone" placeholder="Phone number"/> 
                    <input type="password" name="password" placeholder="Password"/> 
                    <input type="password" name="repeat-password" placeholder="Repeat Password"/> 
                    <button>Sign up</button>
                </form>
            </div>
        )
    }
}