import "./Toggle.css";

export function Toggle({ handleChange }) {
  return (
    <div className="toggle-container">
      <label className="toggle">
        <input
          type="checkbox"
          className="toggle-input"
          onChange={handleChange}
        />
        <span className="toggle-label">8 шт</span>
        <span className="toggle-switch"></span>
        <span className="toggle-label">4 шт</span>
      </label>
    </div>
  );
}
