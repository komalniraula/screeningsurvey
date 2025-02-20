// In App.js

import React, { useState } from "react";
import ScreeningSurvey from "./components/ScreeningSurvey";
import screeningsData from "./data/screenings.json";
import { getRecommendations } from "./utils/getRecommendations";

const App = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSurveySubmit = (userData) => {
    const filteredScreenings = getRecommendations(userData, screeningsData);
    // Save the full screening objects for grouped rendering.
    setRecommendations(filteredScreenings);
    setFormSubmitted(true);
  };

  return (
    <div className={`app-layout ${formSubmitted ? "submitted" : ""}`}>
      <div className="form-container">
        <ScreeningSurvey onSubmit={handleSurveySubmit} />
      </div>
      {formSubmitted && (
        <div className="results">
          <h2>Recommended Screenings</h2>
          {recommendations.length > 0 ? (
            recommendations.map((screen) => (
              <div key={screen.id}>
                <h3>{screen.title}</h3>
                <ul>
                  {screen.recommendation.map((rec, index) => (
                    <li key={index}>
                      <input type="checkbox" /> {rec}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No screenings recommended based on the provided data.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
