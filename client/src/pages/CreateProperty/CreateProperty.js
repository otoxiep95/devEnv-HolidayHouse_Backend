import React from "react";
import PropertyForm from "../../components/PropertyForm/PropertyForm";
import "./CreateProperty.css";

export default function CreateProperty() {
  return (
    <div className="CreateProperty">
      <div className="section">
        <h1>Create property</h1>
        <div className="container">
          <PropertyForm />
        </div>
      </div>
    </div>
  ); 
}
