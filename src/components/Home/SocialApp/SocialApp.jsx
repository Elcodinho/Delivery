import { AppBlock } from "@components/AppBlock/AppBlock";
import mobileHand from "@assets/images/apps/mobile-app-phone-hand.png";
import "./SocialApp.css";

export function SocialApp() {
  return (
    <section className="social-block">
      <div className="container">
        <div className="social-block__wrapper">
          {/* Social */}
          <section className="social-block__media">
            <p className="social-block__media-text">
              Сделай жизнь друзей вкуснее - поделись ссылкой!
            </p>
            <div className="social-block__media-vk">
              <p className="social-block__media-vk__text">
                Не будь жадиной - приводи своих друзей, пусть они тоже попробуют
                нашу божественную пиццу
              </p>
              <a
                className="social-block__media-vk__link"
                href="https://vk.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Открыть страницу ВКонтакте"
              ></a>
            </div>
          </section>

          {/* App */}
          <section className="social-block__app">
            <div className="social-block__app-text">
              <p className="social-block__app-text--green">
                Хотите первым узнавать о новых скидках и акциях, а так же
                получать персональные предложения?
              </p>
              <p className="social-block__app-text--bold">
                Скачайте наше приложение:
              </p>
            </div>
            <div className="social-block__app-container">
              <AppBlock />
            </div>
            <img
              className="social-block__app-img"
              src={mobileHand}
              alt="Мобильное приложение в телефоне"
            />
          </section>
        </div>
      </div>
    </section>
  );
}
