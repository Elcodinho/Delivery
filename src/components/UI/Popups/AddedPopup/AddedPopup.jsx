import "./AddedPopup.css";

export function AddedPopup(props) {
  const { text, position } = props;
  return (
    <div
      className="added-popup"
      style={{ top: `${130 + position * 60}px` }} // Смещение каждого popup на 60px
    >
      Добавлено: {text}
    </div>
  );
}
