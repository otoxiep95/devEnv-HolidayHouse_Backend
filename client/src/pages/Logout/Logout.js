import React, { Component } from 'react';

export default class Logout extends Component {

    componentDidMount() {
        fetch("http://localhost/devenv_holiday_house/api/v1/auth.php", {
            method: "DELETE",
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
                    console.log("Doing great sweetie");
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
    }

    render() {
        return (
            <div className="Logout">
            </div>
        )
    }
}