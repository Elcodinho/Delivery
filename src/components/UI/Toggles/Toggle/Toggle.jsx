import clsx from "clsx";
import "./Toggle.css";

export function Toggle(props) {
  const { size, subCat, selectedAmount, handleChange } = props;

  // Если подкатегория роллы, меняем местами значения в radio
  const isRolli = subCat === "rolli";

  // Определение суффикса в зависимости от категории
  const unitLabel = subCat === "rolli" ? "шт" : "см"; // Для пиццы "см", для роллов "шт"

  // Логика для left и right
  const left = isRolli
    ? selectedAmount === size.large
    : selectedAmount === size.small; // Для роллов инвертируем
  const right = isRolli
    ? selectedAmount === size.small
    : selectedAmount === size.large; // Для роллов инвертируем

  return (
    <div className="toggle-container">
      <label className="toggle">
        {/* Радиокнопка*/}
        <input
          type="radio"
          name="amount"
          value={isRolli ? size.large : size.small}
          checked={left}
          onChange={handleChange}
          className="toggle-input"
        />
        <span className="toggle-label">
          {isRolli ? size.large : size.small} {unitLabel}
        </span>
      </label>

      {/* Переключатель */}
      <span
        className={clsx("toggle-switch", {
          right: right,
        })}
      ></span>

      {/* Радиокнопка*/}
      <label className="toggle">
        <input
          type="radio"
          name="amount"
          value={isRolli ? size.small : size.large}
          checked={right}
          onChange={handleChange}
          className="toggle-input"
        />
        <span className="toggle-label">
          {isRolli ? size.small : size.large} {unitLabel}
        </span>
      </label>
    </div>
  );
}
