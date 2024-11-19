import React from "react";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import LazyLoad from "react-lazyload";
import { getInitialSize } from "@utils/getInitialSize";
import { addProductToCart } from "@utils/addProductToCart";
import { Toggle } from "@components/Card/Toggle/Toggle";
import { Button } from "@components/UI/Button/Button";
import { ImageLoader } from "@components/UI/ImageLoader/ImageLoader";
import "./Card.css";

export const Card = React.memo(function Card(props) {
  const { name, description, img, price, category, subCat, type, slug, size } =
    props;
  const dispatch = useDispatch();
  // Устанавливаем начальное значение размера в зависимости от категории
  const initialSize = useMemo(
    () => getInitialSize(category, subCat, size, type),
    [category, subCat, size, type]
  );

  const [selectedAmount, setSelectedAmount] = useState(initialSize); // Состояние для выбранного количества товара или его размер
  const [productPrice, setProductPrice] = useState(
    typeof price === "object" ? price.large : price // Используем цену сразу, если это число
  );

  // Проверка на классическую пиццу
  const isClassicPizza = category === "pizza" && type === "classic";
  // Переменная для управления показа toggle
  const toggleShow = subCat === "rolli" || isClassicPizza;

  // Обработчик изменения радиокнопки
  function handleToggleChange(event) {
    const selectedValue = parseFloat(event.target.value); // value из radio переводим в число для сравнения
    setSelectedAmount(selectedValue); // Устанавливаем выбранное количество
  }

  // Определение цены в зависимости от выбранного количества
  useEffect(() => {
    // Если price это не число, а объект с ценами (зависит от категории товара), то устанавливаем его в цену
    if (typeof price === "object") {
      setProductPrice(
        selectedAmount === size.small ? price.small : price.large
      );
    }
  }, [selectedAmount, price, size]);

  // Добавляем товар в корзину
  function addProduct() {
    addProductToCart(dispatch, {
      slug,
      name,
      description,
      productPrice,
      img,
      subCat,
      isClassicPizza, // Проверка на классическую пиццу
      isPizzaOrRolli: toggleShow, // Проверка на роллы или классическую пиццу
      selectedAmount, // Передаем текущий размер товара
    });
  }

  return (
    <li className="card">
      <LazyLoad height={200} offset={100} placeholder={<ImageLoader />}>
        <img className="card__img" src={img} alt={name} />
      </LazyLoad>
      <div className="card__text-block">
        <Link
          className="card__link"
          to={`/product/${slug}`}
          aria-label={`Перейти к описанию блюда ${name}`}
        >
          <h4 className="card__title">{name}</h4>
        </Link>
        <p className="card__compound">Состав: {description}</p>
        <div className="toggle-btn__wrapper">
          {toggleShow && (
            <Toggle
              size={size}
              subCat={subCat}
              selectedAmount={selectedAmount}
              handleChange={handleToggleChange}
            />
          )}
          <div className="card__total-btn__wrapper">
            <p className="card__total">
              <span>{productPrice}</span>₽
            </p>
            <Button text="В корзину" handleClick={addProduct} />
          </div>
        </div>
      </div>
    </li>
  );
});
