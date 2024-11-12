import appStore from "@assets/images/apps/appStore.png";
import googlePlay from "@assets/images/apps/googlePlay.png";
import "./AppBlock.css";

export function AppBlock() {
  return (
    <div className="app">
      <a
        className="app__link"
        href="https://www.apple.com/it/app-store/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Открыть приложение в appStore"
      >
        <img src={appStore} alt="апп стор" />
      </a>

      <a
        className="app__link"
        href="https://play.google.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Открыть приложение в googlePlay"
      >
        <img src={googlePlay} alt="гугл плей" />
      </a>
    </div>
  );
}
