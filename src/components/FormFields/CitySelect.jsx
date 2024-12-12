import React from "react";
import "./FormFields.css";

export const CitySelect = React.memo(function CitySelect(props) {
  const { id, feedbackCity, setFeedbackCity } = props;
  return (
    <div className="common-form__group-container">
      <div className="common-form__group">
        <select
          className="common-form__item common-form__item--select"
          name="feedback-city"
          id={id}
          value={feedbackCity}
          onChange={(e) => setFeedbackCity(e.target.value)}
          required
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <label
          className="common-form__label common-form__label--select required"
          htmlFor={id}
        >
          Город
        </label>
      </div>
    </div>
  );
});
