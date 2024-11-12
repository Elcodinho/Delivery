import { useState } from "react";
import { Card } from "@components/Card/Card";
import spiceRoll from "@assets/images/spiceRoll.webp";
import blackRoll from "@assets/images/blackRoll.webp";
import fiestaRoll from "@assets/images/fiesta.webp";
import burgerStreet from "@assets/images/burgerstreet.webp";
import "./Recommended.css";

const recommend = [
  {
    id: "r1",
    name: "Филадельфия тар-тар",
    description:
      "рис, нори, сыр сливочный, свежий огурец, филе лосося слабой соли, соус спайси",
    img: spiceRoll,
    isEight: true,
    amount: 8,
  },
  {
    id: "r2",
    name: "Тэкадо",
    description:
      "рис, нори, сливочный сыр, филе лосося слабой соли, свежее авокадо, соус чесночный, икра масаго, майонез",
    img: blackRoll,
    isEight: true,
    amount: 8,
  },
  {
    id: "r3",
    name: "Фиеста",
    description:
      "рис, нори, сливочный сыр, тигровые креветки, авокадо, икра масаго, свежие помидоры, майонез, соус унаги",
    img: fiestaRoll,
    isEight: true,
    amount: 8,
  },
  {
    id: "4",
    name: "Бургер стрит",
    description:
      "настоящая классика: пшеничная булочка, котлета куриная в панировке, маринованные огурчики, томаты и соус ранч",
    img: burgerStreet,
  },
];

export function Recommended() {
  const [recommendItems, setRecommendItems] = useState(recommend);

  return (
    <section className="recommend">
      <div className="container">
        <h3 className="recommend__title">Рекомендуемое</h3>
        <div className="recommend__wrapper">
          <ul className="recommend__list">
            {recommendItems.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                img={item.img}
                setRecommendItems={setRecommendItems}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
