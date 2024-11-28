import React from "react";
import clsx from "clsx";
import "./Button.css";

export const Button = React.memo(function Button(props) {
  const {
    text,
    cssClass = "",
    type = "button",
    handleClick,
    disabled = false,
  } = props;
  return (
    <button
      type={type}
      className={clsx(`button ${cssClass}`, { "button--disabled": disabled })}
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
});
