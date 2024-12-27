import React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import LazyLoad from "react-lazyload";
import { getInitialSize } from "@utils/getInitialSize";
import { addProductToCart } from "@utils/addProductToCart";
import { addPopup } from "@utils/addPopup";
import { Toggle } from "@components/UI/Toggles/Toggle/Toggle";
import { Button } from "@components/UI/Button/Button";
import { ImageLoader } from "@components/UI/ImageLoader/ImageLoader";
import "./Card.css";

export const Card = React.memo(function Card(props) {
  const {
    name,
    description,
    img,
    price,
    weight,
    category,
    disabled,
    subCat,
    type,
    slug,
    size,
    setPopups,
  } = props;
  const dispatch = useDispatch();
  // Устанавливаем начальное значение размера в зависимости от категории
  const initialSize = useMemo(
    () => getInitialSize(category, subCat, size, type),
    [category, subCat, size, type]
  );

  const [selectedAmount, setSelectedAmount] = useState(initialSize); // Состояние для выбранного количества товара или его размер
  const [imgError, setImgError] = useState(false); // Стейт для отслеживания ошибки загрузки
  const [productPrice, setProductPrice] = useState(
    typeof price === "object" ? price.large : price // Используем цену сразу, если это число
  );
  const [productWeight, setProductWeight] = useState(
    typeof weight === "object" ? weight.large : weight // Используем вес сразу, если это число
  );

  // Проверка на классическую пиццу
  const isClassicPizza = category === "pizza" && type === "classic";
  // Переменная для управления показа toggle
  const toggleShow = subCat === "rolli" || isClassicPizza;

  // Обработчик изменения радиокнопки
  const handleToggleChange = useCallback((event) => {
    const selectedValue = parseFloat(event.target.value); // value из radio переводим в число для сравнения
    setSelectedAmount(selectedValue); // Устанавливаем выбранное количество
  });

  // Добавляем товар в корзину

  // Универсальная функция для получения нужной цены или веса
  const getProductAttribute = (attribute, selectedAmount) => {
    if (typeof attribute === "object") {
      return selectedAmount === size.small ? attribute.small : attribute.large;
    }
    return attribute; // Если значение не объект, просто возвращаем его
  };

  // Определение цены  и веса продукта в зависимости от выбранного количества
  useEffect(() => {
    setProductPrice(getProductAttribute(price, selectedAmount));
    setProductWeight(getProductAttribute(weight, selectedAmount));
  }, [selectedAmount, price, weight]);

  // Добавляем товар в корзину
  const addProduct = useCallback(() => {
    addProductToCart(dispatch, {
      slug,
      name,
      description,
      productPrice,
      weight: productWeight,
      img,
      subCat,
      isClassicPizza, // Проверка на классическую пиццу
      isPizzaOrRolli: toggleShow, // Проверка на роллы или классическую пиццу
      selectedAmount, // Передаем текущий размер товара
    });
    addPopup(name, setPopups); // Передаём имя товара в массив popups
  });

  // Обработчик ошибки загрузки
  function handleError() {
    setImgError(true); // Включаем ошибку при неудачной загрузке
  }

  return (
    <li className="card">
      {disabled && <div className="card--disabled">Временно недоступно</div>}
      <LazyLoad height={300} offset={500} placeholder={<ImageLoader />} once>
        {!imgError ? (
          <img
            className="card__img"
            src={img}
            alt={name}
            loading="lazy"
            onError={handleError} // При ошибке загрузки вызывается обработчик
          />
        ) : (
          <div className="img--error">
            <p>Ошибка загрузки изображения</p> {/* Показываем div с ошибкой */}
          </div>
        )}
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
