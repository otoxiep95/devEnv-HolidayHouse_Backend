import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class LoginForm extends Component {

  state = {
    email: null,
    password: null,
    error: null,
    isAuth: this.props.isAuth
  };

  
  login = () => {
    fetch("http://localhost/devenv_holiday_house/api/v1/auth.php", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => {
        if (res.ok) {
          this.setState({ isAuth: true });
          this.props.history.push("/properties");
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
      <div className="LoginForm">
        <form method="POST">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="button" onClick={this.login}>
            Log in
          </button>
          {this.state.error ? <p>{this.state.error}</p> : null}
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
