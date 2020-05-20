import React from 'react';
import "./Home.css";

export default function Home() {
   /*  state = {
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
 */
    return (
        <div className="Home">
            <div>
                <input id="zipcode" placeholder="Zipcode" /* onChange={this.handleInputChange} */ />
                <button /* onClick={this.onFormSubmit} */>Submit</button>
            </div>
        </div>
    )
    
}
