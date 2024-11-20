import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectMenu, getMenu } from "@store/menuSlice";
import { getInitialSize } from "@utils/getInitialSize";
import { addProductToCart } from "@utils/addProductToCart";
import { ProductSupplements } from "./ProductSupplements/ProductSupplements";
import { Button } from "@components/UI/Button/Button";
import { Toggle } from "@components/Card/Toggle/Toggle";
import { Loader } from "@components/UI/Loader/Loader";
import "./Product.css";

export function Product() {
  const { slug } = useParams();
  const item = useSelector(selectMenu);
  const product = item[0];
  const dispatch = useDispatch();
  const {
    name,
    description,
    image: img,
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

  const [selectedAmount, setSelectedAmount] = useState(null); // Состояние для выбранного количества товара или его размер
  const [productPrice, setProductPrice] = useState(
    typeof price === "object" ? price.large : price // Используем цену сразу, если это число
  );
  const [productWeight, setProductWeight] = useState(
    typeof weight === "object" ? weight.large : weight // Используем вес сразу, если это число
  );

  const isClassicPizza = category === "pizza" && type === "classic";

  // Переменная для управления показа toggle
  const toggleShow =
    subCat === "rolli" || (category === "pizza" && type !== "rimskaya");

  // Обработчик изменения радиокнопки
  const handleToggleChange = useCallback((event) => {
    const selectedValue = parseFloat(event.target.value); // value из radio переводим в число для сравнения
    setSelectedAmount(selectedValue); // Устанавливаем выбранное количество
  });

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

  // Функция добавления товара в корзину
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
  });

  return (
    <section className="product">
      <div className="container">
        {productStatus === "loading" && <Loader />}
        {productError && <p className="text--error">{productError}</p>}
        {productStatus === "resolved" && !isClassicPizza && (
          <div className="product__wrapper">
            <div className="product__img-container">
              <img className="product__img" src={img} alt={name} />
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
                <Button
                  text={`В корзину за ${productPrice} ₽`}
                  cssClass="product-btn--size"
                  handleClick={addProduct}
                />
              </div>
            </div>
          </div>
        )}
        {productStatus === "resolved" && isClassicPizza && (
          <ProductSupplements
            img={img}
            name={name}
            productWeight={productWeight}
            description={description}
            productPrice={productPrice}
            size={size}
            subCat={subCat}
            slug={slug}
            selectedAmount={selectedAmount}
            handleToggleChange={handleToggleChange}
            toggleShow={toggleShow}
          />
        )}
      </div>
    </section>
  );
}
