import React, { Component } from 'react';
import "./Home.css";

class Home extends Component {
    state = {
        zipcode: undefined,
    }

    handleInputChange = (event) => {
        this.setState({ zipcode: event.target.value });
    }

    onFormSubmit = () => {
        const { zipcode } = this.state;
        //this.props.handleZipcodeChange(zipcode);
        this.props.history.push('/properties', { passedzipcode: zipcode });
    }

    render() {
        return (
            <div className="Home">
                <div>
                    <input id="zipcode" placeholder="Zipcode" onChange={this.handleInputChange} />
                    <button onClick={this.onFormSubmit}>Submit</button>
                </div>
            </div>
        )
    }
}

export default Home;
