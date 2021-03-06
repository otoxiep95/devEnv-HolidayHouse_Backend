import React from "react";

export default function PropertyItem(props) {
  const { fetchProperty, profile } = props;

  const {
    house_id,
    country,
    city,
    /* postal, */
    street,
    size,
    bedroom,
    bathroom,
    image,
    price_per_night
  } = props.property;

  return (
    <div
      id={house_id}
      key={house_id}
      className="PropertyItem property"
      onClick={() => fetchProperty(house_id)}
    >
      <div>
        <div
          className="img"
          style={{
            background: `url(/user_uploads/img/thumbnail/${image}) no-repeat center center`,
            backgroundSize: "cover"
          }}
        ></div>
      </div>
      <div className="propertyInfo">
        <div className="propertyGeneral">
          <h3>${price_per_night}</h3>
          <p>{bedroom} bds</p>
          <p>{bathroom} ba</p>
          <p>{size} sqm</p>
        </div>
        <div className="propertyAddress">
          <p>
            {street}, {city}, {country}
          </p>
        </div>
      </div>
    </div>
  );
}
