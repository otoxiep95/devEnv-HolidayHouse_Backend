import React from 'react';
import { Link } from "react-router-dom";

export default function PropertyItemProfile({property, deleteProperty}) {
    return (
        <div className="PropertyItemProfile">
            <h3>{property.title}</h3>
            <span>Created at: date</span>
            <div className="img">
            </div>
            <Link to={"/update-property/" + property.house_id}>
                <button>Update</button>
            </Link>
            <button onClick={() => deleteProperty(property.house_id)}>Delete</button>
        </div> 
    )
}