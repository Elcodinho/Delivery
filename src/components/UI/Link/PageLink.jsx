import { Link } from "react-router-dom";
import "./PageLink.css";

export function PageLink(props) {
  const { text, cssClass = "", adress } = props;
  return (
    <Link to={adress} className={`link ${cssClass}`}>
      {text}
    </Link>
  );
}
