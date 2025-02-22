import React, { useState } from "react";

const options = [
  "Smoker",
  "Sex worker / IV Drug user",
  "Familial Adenomatous Polyposis (APC gene mutation)",
  "Familial Adenopolyposis",
  "Familial Hypercholesterolemia",
  "Lynch Syndrome HNPCC",
  "Inflammatory Bowel Disease",
  "BRCA Mutation",
  "Diabetic",
  "Language Delay (Kid)"
];

const ScreeningSurvey = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    pregnant: "",
    weeksPregnant: "",
    selectedOptions: [],
  });

  // Generic handler for input/select changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkbox toggle for options
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with:", formData);
    onSubmit(formData);
  };

  const { age, gender, pregnant, weeksPregnant, selectedOptions } = formData;

  return (
    <div className="survey-container">
      <h2>Health Screening Survey</h2>
      <p>
        This is a screening survey where we help patients navigate the screening
        services they need to stay healthy. Built from Divine Intervention and USPSTF guidelines.
      </p>
      <hr />

      <form onSubmit={handleSubmit}>
        {/* Age Section */}
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

        {/* Gender Section */}
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

        {/* Pregnancy Section (only for Female) */}
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

        {/* Options Section */}
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ScreeningSurvey;
