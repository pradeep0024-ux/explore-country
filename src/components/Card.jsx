import React from "react";
import "./styles/CardStyle.css";

function Card({ item }) {
  const { name, capital, languages, flags,population } = item;

  // Extract the first language from the languages object
  const language = languages ? Object.values(languages)[0] : "N/A";

  // Extract the capital (it is an array, take the first element)
  const capitalName = capital && capital.length > 0 ? capital[0] : "N/A";

  return (
    <div className="country-card">
      {/* Flag Section */}
      <div className="country-flag-container">
        <img
          className="country-flag"
          src={flags?.svg || "https://via.placeholder.com/150"}
          alt={`${name?.common} flag`}
        />
      </div>

      {/* Details Section */}
      <div className="country-details">
        <h2 className="country-name">Name: {name?.common || "Unknown"}</h2>
        <h4 className="country-capital">Capital: {capitalName}</h4>
        <p className="country-language">Language: {language}</p>
        <p className="country-language">Population: {population}</p>
      </div>
    </div>
  );
}

export default Card;
