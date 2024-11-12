import { SECONDARYNAV } from "@constants/constants";
import { SecondaryNav } from "@components/Navigations/SecondaryNav/SecondaryNav";
import { PageLink } from "@components/UI/Link/PageLink";
import aboutBanner from "@assets/images/about-banner.webp";
import "./About.css";

export function About() {
  return (
    <section className="about">
      <div className="container">
        <div className="about__wrapper">
          <div className="about__text">
            <SecondaryNav buttons={SECONDARYNAV.aboutContactsNav} />
            <h2 className="title--2">О нас</h2>
            <p className="text text--bigger">
              В нашем ресторане работают настоящие мастера своего дела, что
              позволяет нам оставаться явными лидерами в кулинарной индустрии.
              Мы дорожим и своим именем, и вашим здоровьем, поэтому в составе
              наших угощений всегда свежие и проверенные ингредиенты. Мы
              постоянно развиваемся и стараемся делать все возможное, чтобы не
              разочаровать вас. Вы обязательно оцените теплую и уютную
              атмосферу, вкусную еду и приветливый персонал. А если у вас нет
              возможности посетить нас, мы с радостью доставим ваш заказ домой
              или в офис.
            </p>
            <p className="text text--bigger">
              Сервис доставки, созданный ради выгод и удовольствия клиентов, –
              как думаешь, такое реально? Отвечаем: да и еще раз да! Разумеется,
              как и все заведения подобного формата, мы ценим хорошую прибыль и
              развитие. Однако это не мешает нам делать акцент на вкусовых
              пристрастиях и комфорте собственных гостей. Поэтому если уж
              решился на заказ роллов, сделай это в таком надежном месте, как
              «Еда54»!
            </p>
            <ul className="about__list">
              <li className="about__list-item">
                Работаем на чистой, полностью оборудованной кухне, контролируя
                качество всех используемых ингредиентов уже на стадии закупки.
              </li>
              <li className="about__list-item">
                Установили четкие рамки доставки доставки еды – от 60 до 90
                минут. Если курьер задерживается более чем на полчаса – с нас
                компенсирующие бонусы.
              </li>
              <li className="about__list-item">
                Имеем достаточное количество термотары, чтобы обеспечить горячей
                едой каждого клиента без исключения.
              </li>
              <li className="about__list-item">
                Постоянно организуем веселые конкурсы и акции, с которыми у
                наших фанатов появляется уникальная возможность заказывать
                больше и дешевле.
              </li>
            </ul>
          </div>
          <div className="about__banner">
            <img
              className="about__banner-img"
              src={aboutBanner}
              alt="роллы и пицца"
            />
            <div className="about__banner-link">
              <PageLink text="Перейти в меню" adress="/menu/sushi-i-rolli" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
