import "./ToggleCheckbox.css";
export function ToggleCheckbox(props) {
  const { checked, handleChange } = props;
  return (
    <div className="toggle-check__container">
      <label className="toggle-check">
        <input
          type="checkbox"
          className="toggle-check__input"
          checked={checked}
          onChange={handleChange}
        />
        <span className="toggle-check__label">Перезвонить</span>
        <span className="toggle-check__switch"></span>
        <span className="toggle-check__label">Не перезванивать</span>
      </label>
    </div>
  );
}
