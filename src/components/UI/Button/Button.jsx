import React from "react";
import "./Button.css";

export const Button = React.memo(function Button(props) {
  const { text, cssClass = "", type = "button", handleClick } = props;
  return (
    <button type={type} className={`button ${cssClass}`} onClick={handleClick}>
      {text}
    </button>
  );
});
