import React, { useState } from "react";

const options = [
  "Smoker",
  "Sex worker / IV Drug user",
  "Diabetic",
  "Language Delay (Kid)"
];

const geneticDiseases = [
  "Familial Adenomatous Polyposis (APC gene mutation)",
  "Familial Adenopolyposis",
  "Familial Hypercholesterolemia",
  "Lynch Syndrome HNPCC",
  "Inflammatory Bowel Disease",
  "BRCA Mutation"
];

const ScreeningSurvey = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    pregnant: "",
    weeksPregnant: "",
    selectedOptions: [],
    selectedGeneticDiseases: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (option) => {
    setFormData((prev) => {
      const { selectedOptions } = prev;
      return {
        ...prev,
        selectedOptions: selectedOptions.includes(option)
          ? selectedOptions.filter((o) => o !== option)
          : [...selectedOptions, option],
      };
    });
  };

  const handleGeneticDiseaseChange = (disease) => {
    setFormData((prev) => {
      const { selectedGeneticDiseases } = prev;
      return {
        ...prev,
        selectedGeneticDiseases: selectedGeneticDiseases.includes(disease)
          ? selectedGeneticDiseases.filter((d) => d !== disease)
          : [...selectedGeneticDiseases, disease],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with:", formData);
    onSubmit(formData);
  };

  const { age, gender, pregnant, weeksPregnant, selectedOptions, selectedGeneticDiseases } = formData;

  return (
    <div className="survey-container">
      <h2>Health Screening Survey</h2>
      <p>
        This is a screening survey where we help patients navigate the screening
        services they need to stay healthy. Built from Divine Intervention and USPSTF guidelines.
      </p>
      <hr />

      <form onSubmit={handleSubmit}>
        <div className="section">
          <label htmlFor="age">Age:</label>
          <div className="input-container">
            <input
              type="number"
              id="age"
              name="age"
              className="small-input"
              value={age}
              onChange={handleChange}
              required
            />
            <span className="age-label">years</span>
          </div>
        </div>
        <hr />

        <div className="section">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            className="small-input"
            value={gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {gender === "Female" && (
          <>
            <hr />
            <div className="section">
              <label>Are you currently pregnant?</label>
              <div className="radio-options">
                <label>
                  <input
                    type="radio"
                    name="pregnant"
                    value="Yes"
                    checked={pregnant === "Yes"}
                    onChange={handleChange}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="pregnant"
                    value="No"
                    checked={pregnant === "No"}
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
            </div>

            {pregnant === "Yes" && (
              <div className="section pregnancy-spacing">
                <label htmlFor="weeksPregnant">How many weeks?</label>
                <select
                  id="weeksPregnant"
                  name="weeksPregnant"
                  className="small-input"
                  value={weeksPregnant}
                  onChange={handleChange}
                >
                  <option value="">Select weeks</option>
                  <option value="1 week">1 week</option>
                  <option value="2-10 weeks">2-10 weeks</option>
                  <option value="11-20 weeks">11-20 weeks</option>
                  <option value="21-30 weeks">21-30 weeks</option>
                  <option value="30+ weeks">30+ weeks</option>
                </select>
              </div>
            )}
            <hr />
          </>
        )}

        <div className="section">
          <label className="checkbox-title">Select all that apply to you:</label>
          <div className="checkbox-group">
            {options.map((option) => (
              <div key={option} className="checkbox-item">
                <input
                  type="checkbox"
                  id={option}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionChange(option)}
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <label className="checkbox-title">Any Genetic Disease:</label>
          <div className="checkbox-group">
            {geneticDiseases.map((disease) => (
              <div key={disease} className="checkbox-item">
                <input
                  type="checkbox"
                  id={disease}
                  checked={selectedGeneticDiseases.includes(disease)}
                  onChange={() => handleGeneticDiseaseChange(disease)}
                />
                <label htmlFor={disease}>{disease}</label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ScreeningSurvey;
