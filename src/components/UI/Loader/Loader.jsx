import "./Loader.css";

export function Loader({ cssClass = "" }) {
  return (
    <div className="overlay">
      <div className={`spinner ${cssClass}`}></div>
    </div>
  );
}
