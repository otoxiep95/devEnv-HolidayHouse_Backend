import React, { useState } from 'react';
import "./Home.css";
import { useHistory } from 'react-router-dom';

export default function Home() {
    let history = useHistory();
    const [searchTerm, setSearchTerm] = useState("");

    function onFormSubmit() {
        //const { searchTerm } = this.state;
        //this.props.handleZipcodeChange(searchTerm);
        history.push('/properties', { passedSearchTerm: searchTerm })
    };

    return (
        <div className="Home">
            <div>
                <input id="zipcode" placeholder="Zipcode" onChange={e => setSearchTerm(e.target.value)} />
                <button onClick={onFormSubmit}>Submit</button>
            </div>
        </div>
    )

}
