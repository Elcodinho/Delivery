import React from "react";
import "./FormFields.css";

export const AboutSelect = React.memo(function AboutSelect(props) {
  const { id, feedbackAbout, setFeedbackAbout } = props;
  return (
    <div className="common-form__group-container">
      <div className="common-form__group">
        <select
          className="common-form__item common-form__item--select"
          name="feedback-about"
          id={id}
          value={feedbackAbout}
          onChange={(e) => setFeedbackAbout(e.target.value)}
          required
        >
          <option value="О Ресторане">О Ресторане</option>
          <option value="О службе доставки">О службе доставки</option>
        </select>
        <label
          className="common-form__label common-form__label--select required"
          htmlFor={id}
        >
          Тема
        </label>
      </div>
    </div>
  );
});
