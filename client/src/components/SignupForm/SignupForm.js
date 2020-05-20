import React, { Component } from 'react';

export default class SignupForm extends Component {
    state = {
        first_name: null,
        last_name: null,
        phone: null,
        email: null,
        password: null,
        confirm_password: null,
        error: null
    };


    signup = () => {
        fetch("http://localhost/devenv_holiday_house/api/v1/user.php", {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone: this.state.phone,
            email: this.state.email,
            password: this.state.password,
            confirm_password: this.state.confirm_password
          })
        })
          .then(res => {
            if (res.ok) {
                this.props.history.push("/login");
            } else {
              throw res;
            }
          })
          .catch(err => {
            err.json().then(body => {
              console.log(body);
              this.setState({ error: body.message });
            });
        });
    };

    render() {
        return (
            <div className="SignupForm">
                <form method="POST">
                    <input 
                        type="text" 
                        name="first_name" 
                        placeholder="First name"
                        onChange={e => this.setState({ first_name: e.target.value })}
                    />
                    <input 
                        type="text" 
                        name="last_name" 
                        placeholder="Last name"
                        onChange={e => this.setState({ last_name: e.target.value })}
                    />
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email"
                        onChange={e => this.setState({ email: e.target.value })}
                    /> 
                    <input 
                        type="text" 
                        name="phone" 
                        placeholder="Phone number"
                        onChange={e => this.setState({ phone: e.target.value })}
                    /> 
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        onChange={e => this.setState({ password: e.target.value })}
                    /> 
                    <input 
                        type="password" 
                        name="confirm_password" 
                        placeholder="Repeat Password"
                        onChange={e => this.setState({ confirm_password: e.target.value })}
                    /> 
                    <button type="button" onClick={this.signup}>Sign up</button>
                </form>
                {this.state.error ? <p>{this.state.error}</p> : null}
            </div>
        )
    }
}