import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectMenu, getMenu } from "@store/menuSlice";
import { getInitialSize } from "@utils/getInitialSize";
import { ProductSupplements } from "./ProductSupplements/ProductSupplements";
import { Button } from "@components/UI/Button/Button";
import { Toggle } from "@components/Card/Toggle/Toggle";
import { CounterBtn } from "@components/UI/CounterBtn/CounterBtn";
import { Loader } from "@components/UI/Loader/Loader";
import "./Product.css";
//  // //
import burgerImg from "@assets/images/street.webp";

export function Product() {
  const { slug } = useParams();
  const item = useSelector(selectMenu);
  const product = item[0];
  const dispatch = useDispatch();
  const {
    name,
    description,
    img,
    price,
    category,
    subCat,
    type,
    size,
    weight,
  } = product || {}; // Свойства объекта продукта
  const { status: productStatus, error: productError } = useSelector(
    (state) => state.menu
  ); // Состояние статуса и ошибки получения продукта

  const [counter, setCounter] = useState(null); // Состояние счетчика категории суши
  const [selectedAmount, setSelectedAmount] = useState(null); // Состояние для выбранного количества товара
  const [productPrice, setProductPrice] = useState(
    typeof price === "object" ? price.large : price // Используем цену сразу, если это число
  );
  const [productWeight, setProductWeight] = useState(
    typeof weight === "object" ? weight.large : weight // Используем вес сразу, если это число
  );

  const isClassisPizza = category === "pizza" && type === "classic";

  // Переменная для управления показа toggle
  const toggleShow =
    subCat === "rolli" || (category === "pizza" && type !== "rimskaya");

  // Переменная для показа кнокпи counter
  const showCounter = subCat === "sushi";

  // Обработчик изменения радиокнопки
  function handleToggleChange(event) {
    const selectedValue = parseFloat(event.target.value); // value из radio переводим в число для сравнения
    setSelectedAmount(selectedValue); // Устанавливаем выбранное количество
  }

  // Получение продукта
  useEffect(() => {
    dispatch(getMenu({ slug }));
  }, [slug, dispatch]);

  // Универсальная функция для получения нужной цены или веса
  const getProductAttribute = (attribute, selectedAmount) => {
    if (typeof attribute === "object") {
      return selectedAmount === size.small ? attribute.small : attribute.large;
    }
    return attribute; // Если значение не объект, просто возвращаем его
  };

  // Устанавливаем начальное значение размера в зависимости от категории после загрузки продукта
  useEffect(() => {
    if (product) {
      const initialSize = getInitialSize(category, subCat, size, type);
      setSelectedAmount(initialSize);
    }
  }, [product, category, subCat, size, type]);

  // Определение цены  и веса продукта в зависимости от выбранного количества
  useEffect(() => {
    if (product) {
      setProductPrice(getProductAttribute(price, selectedAmount));
      setProductWeight(getProductAttribute(weight, selectedAmount));
    }
  }, [product, selectedAmount, price, weight]);

  // Установка состояния счетчика категории суши
  useEffect(() => {
    if (subCat === "sushi") {
      setCounter(1);
    }
  }, [subCat]);

  return (
    <section className="product">
      <div className="container">
        {productStatus === "loading" && <Loader />}
        {productError && <p className="text--error">{productError}</p>}
        {productStatus === "resolved" && !isClassisPizza && (
          <div className="product__wrapper">
            <div className="product__img-container">
              <img className="product__img" src={burgerImg} alt={name} />
            </div>
            <div className="product__info-container">
              <h2 className="title--2">{name}</h2>
              <p className="product-weight__text">({productWeight} г)</p>
              <p className="product__descritpion">Состав: {description}</p>
              {toggleShow && (
                <Toggle
                  size={size}
                  subCat={subCat}
                  selectedAmount={selectedAmount}
                  handleChange={handleToggleChange}
                />
              )}
              <div className="product__btn-block">
                {showCounter && (
                  <CounterBtn
                    price={productPrice}
                    counter={counter}
                    setCounter={setCounter}
                  />
                )}
                {!showCounter && (
                  <Button
                    text={`В корзину за ${productPrice} ₽`}
                    cssClass="product-btn--size"
                  />
                )}
              </div>
            </div>
          </div>
        )}
        {productStatus === "resolved" && isClassisPizza && (
          <ProductSupplements
            burgerImg={burgerImg}
            name={name}
            productWeight={productWeight}
            description={description}
            productPrice={productPrice}
            size={size}
            subCat={subCat}
            selectedAmount={selectedAmount}
            handleToggleChange={handleToggleChange}
            toggleShow={toggleShow}
            showCounter={showCounter}
          />
        )}
      </div>
    </section>
  );
}
