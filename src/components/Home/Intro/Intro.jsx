import { useState } from "react";
import clsx from "clsx";
import { PHONE } from "@constants/constants";
import { phoneFormatter } from "@utils/phoneFormatter";
import { Button } from "@components/UI/Button/Button";
import "./Intro.css";

export function Intro() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <section className="intro">
      <div className="container">
        <div className="intro__wrapper">
          <h1 className="intro__title">
            Доставка еды в Симферополе: вкусно, быстро и недорого
          </h1>

          <p className="text">
            Каждый день люди вовлекаются в битву с голодом. Одни теряются в
            бесконечных муках о том, что новенького приготовить, другие большую
            часть свободного времени проводят на кухне, посвящая себя готовке и
            мытью посуды. Победить эти и другие проблемы помогает готовая еда на
            дом: доставка «Еда54» готовит блюда за вас. Нужно только сделать
            заказ и дождаться прибытия курьера
          </p>
          <div
            className={clsx("intro__text-container", {
              "intro__text-container--expanded": isExpanded,
            })}
          >
            <h2 className="title--2">Кухни всего мира с доставкой на дом</h2>

            <p className="text">
              В нашем меню вы найдёте блюда самых разных культур. Заказ готовой
              еды даёт возможность попробовать:
            </p>
            <ul className="intro__list">
              <li className="intro__item">
                Азиатскую кухню, знаменитую роллами, суши и воками;
              </li>
              <li className="intro__item">
                Итальянскую кухню, характеризующуюся разнообразной пиццей;
              </li>
              <li className="intro__item">
                Американскую кухню, отличающуюся сочными бургерами;
              </li>
              <li className="intro__item">
                Индонезийскую кухню, славящуюся пряным том ямом.
              </li>
            </ul>
            {!isExpanded && <div className="intro__fade"></div>}
            <p className="text">
              И это не предел! Мы привезем еду любого уголка планеты, включая
              отечественные блюда: сырники, блины и многое другое. Главное —
              понять, в каком месте хочется отдохнуть душой, открывая новые
              вкусы или заказав привычные, дорогие сердцу блюда.
            </p>

            <h2 className="title--2">С заботой о каждом клиенте</h2>
            <p className="text">
              С 9 утра до полуночи действуют специальные предложения. В
              Симферополе мы можем порадовать тех, кто любит классические
              завтраки: готовим яичницы, омлеты и каши тем, кто правильно
              начинает день. Также, мы привезем сытный ланч, предлагая на выбор
              сэндвичи, шакшуку или иные блюда! Действует возможность заказывать
              комбо-наборы со всем необходимым, включая пиццу, закуски, горячие
              блюда и напитки — на большую компанию по выгодной стоимости.
            </p>

            <p className="text">
              Любители сладкого не останутся разочарованными благодаря нашим
              десертным роллам. Кроме того, доставка «Еда54» помимо привычных
              лимонадов и соков предлагает свежие и полезные морсы собственного
              производства.
            </p>
            <h3 className="title--3">
              Почему заказать еду в Симферополе с доставкой стоит у нас?
            </h3>
            <p className="text">
              Наши постоянные клиенты неслучайно предпочитают заказывать в
              «Еда54»:
            </p>
            <ul className="intro__list">
              <li className="intro__item">
                Курьеры оперативно развозят заказы. При этом блюда не
                повреждаются, доезжают целыми, горячими и свежими благодаря
                продвинутой упаковке.
              </li>
              <li className="intro__item">
                Больше не нужно спорить о доставке кухни определённой категории,
                наше меню предлагает блюда самых разных стран. Фанаты бургеров и
                суши получат заказ одновременно без переплат за доставку из
                разных точек!
              </li>
              <li className="intro__item">
                Доставляем еду в любую точку Симферополя и даже за его пределы.
                Стоимость и условия доставки можно уточнить в разделе “Условия
                доставки” или по телефону.
              </li>
              <li className="intro__item">
                В случае торжественных мероприятий или особых поводов можем
                приготовить блюда на заказ: салаты, супы, запеченные овощи и др.
                Однако, такие позиции необходимо оформлять за сутки.
              </li>
            </ul>
            <h2 className="title--2">Заказ и доставка</h2>
            <p className="text">
              Мы работаем ежедневно! Оформить заказ можно на сайте или по
              телефону
              {phoneFormatter(PHONE)}
            </p>
            <p className="text">
              Время работы: С 9:00 до 23:30, с понедельника по воскресенье.
            </p>
            <p className="text">
              Приходите или заказывайте на дом: мы освободим вас от кухни и
              сделаем любой день вкуснее!
            </p>
          </div>

          {/* Кнопка для показа текста */}

          <div className="intro-btn__wrapper">
            <Button
              text={isExpanded ? "Скрыть текст" : "Показать текст"}
              cssClass="button--show-more"
              handleClick={toggleText}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
