import "./WarningForm.css";

export function WarningForm(props) {
  const { symbols } = props;
  const {
    text = `Пожалуйста, введите не меньше 0 и не больше ${symbols} символов`,
  } = props;
  return <p className="warning-form__text">{text}</p>;
}
