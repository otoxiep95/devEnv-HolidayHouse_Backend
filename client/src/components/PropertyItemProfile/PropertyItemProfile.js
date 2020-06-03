import React from "react";
import { Link } from "react-router-dom";
import "./PropertyItemProfile.css";

export default function PropertyItemProfile({ property, deleteProperty }) {
  return (
    <div className="PropertyItemProfile">
      <h3>{property.title}</h3>
      <div
        className="img"
        style={{
          background: `url(/user_uploads/img/thumbnail/${property.image}) no-repeat center center`,
          backgroundSize: "cover"
        }}
      ></div>
      <div className="buttons">
        <Link to={"/update-property/" + property.house_id}>
          <button>Update</button>
        </Link>
        <button onClick={() => deleteProperty(property.house_id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
