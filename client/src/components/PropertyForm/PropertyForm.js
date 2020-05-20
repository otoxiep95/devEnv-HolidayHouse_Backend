import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class PropertyForm extends Component {
  state = {
    title: "",
    description: "",
    bedroom: 0,
    bathroom: 0,
    size: 0,
    street: "",
    city: "",
    country: "",
    postal: 0,
    price_per_night: 0,
    image: "asdasd.jpg",
    house_id: 0,
    user_id: 0,
    error: null
  };

  createPropertyHandler = () => {
    fetch("http://localhost/devenv_holiday_house/api/v1/house.php?", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        bedroom: this.state.bedroom,
        bathroom: this.state.bathroom,
        size: this.state.size,
        street: this.state.street,
        city: this.state.city,
        country: this.state.country,
        postal: this.state.postal,
        price_per_night: this.state.price_per_night,
        image: this.state.image
      })
    })
      .then(res => {
        if (res.ok) {
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
      <div className="PropertyForm">
        <form className="inputPropertyForm" method="POST" /* enctype="multipart/form-data" */>
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={e => this.setState({ title: e.target.value })}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={e => this.setState({ description: e.target.value })}
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            onChange={e => this.setState({ street: e.target.value })}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={e => this.setState({ city: e.target.value })}
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            onChange={e => this.setState({ country: e.target.value })}
          />
          <input
            type="text"
            name="zip-code"
            placeholder="Zip code"
            onChange={e => this.setState({ postal: e.target.value })}
          />
          <input
            type="text"
            name="bedrooms"
            placeholder="Bedrooms"
            onChange={e => this.setState({ bedroom: e.target.value })}
          />
          <input
            type="text"
            name="bathrooms"
            placeholder="Bathrooms"
            onChange={e => this.setState({ bathroom: e.target.value })}
          />
          <input
            type="text"
            name="area"
            placeholder="Area size"
            onChange={e => this.setState({ size: e.target.value })}
          />
          <input
            type="text"
            name="price"
            placeholder="Price pr. night"
            onChange={e => this.setState({ price_per_night: e.target.value })}
          />
           <input
            type="file"
            name="image"
            onChange={e => this.setState({ image: e.target.value })}
          />
          <div className="buttonWrapper">
            <button
              type="button"
              className="createPropertyButton"
              onClick={this.createPropertyHandler}
            >
              Create property
            </button>
          </div>
        </form>
        {this.state.error ? <p>{this.state.error}</p> : null}
      </div>
    );
  }
}

export default withRouter(PropertyForm);
