import "./Button.css";

export function Button(props) {
  const { text, cssClass = "", type = "button", handleClick } = props;
  return (
    <button type={type} className={`button ${cssClass}`} onClick={handleClick}>
      {text}
    </button>
  );
}
