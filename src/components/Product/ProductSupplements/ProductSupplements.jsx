import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { getSupplement, selectSupplement } from "@store/supplementSlice";
import { addProductToCart } from "@utils/addProductToCart";
import { ProductSupplementsItem } from "./ProductSupplementsItem/ProductSupplementsItem";
import { Toggle } from "@components/UI/Toggles/Toggle/Toggle";
import { Button } from "@components/UI/Button/Button";
import { Loader } from "@components/UI/Loader/Loader";
import { FaInfoCircle } from "react-icons/fa";
import "./ProductSupplements.css";

export function ProductSupplements(props) {
  const {
    img,
    name,
    productWeight,
    description,
    productPrice,
    size,
    subCat,
    slug,
    selectedAmount,
    handleToggleChange,
    toggleShow,
  } = props;
  const supplements = useSelector(selectSupplement);
  const dispatch = useDispatch();
  const { status: supStatus, error: supError } = useSelector(
    (state) => state.supplement
  );
  const [totalPrice, setTotalPrice] = useState(productPrice); // Состояние для отслеживания общей цены
  const [selectedSupplements, setSelectedSupplements] = useState([]); // Для отслеживания выбранных добавок
  const [resetCheck, setResetCheck] = useState(null); // Состояние для сброса всех отмеченых добавок
  const [showInfo, setShowInfo] = useState(false); // Состояние показа popup добавок
  // Получаем список добавок
  useEffect(() => {
    dispatch(getSupplement());
  }, [dispatch]);

  // Обновляем общую цену при получении productPrice
  useEffect(() => {
    if (productPrice !== undefined) {
      setTotalPrice(productPrice);
    }
  }, [productPrice]);

  // Сброс добавок и общей цены при изменении веса продукта
  useEffect(() => {
    setSelectedSupplements([]);
    setTotalPrice(productPrice);
  }, [productWeight, productPrice]);

  // Функция для обновления общей цены и выбранных добавок
  const updateTotalPrice = (item, isChecked) => {
    setSelectedSupplements((prev) => {
      const newSupplements = isChecked
        ? [...prev, item] // Добавляем добавку в массив
        : prev.filter((supplement) => supplement.name !== item.name); // Удаляем добавку из массива

      // Пересчитываем общую цену
      const newTotalPrice = newSupplements.reduce(
        (acc, supplement) => acc + supplement.price,
        productPrice // Начальная цена продукта
      );
      setTotalPrice(newTotalPrice);

      return newSupplements;
    });
  };

  // Функция показа popup для добавок
  function handleInfoToggle() {
    setShowInfo((prevShow) => !prevShow);
  }

  // Функция добавления товара в корзину
  const addProduct = useCallback(() => {
    // Преобразуем массив selectedSupplements, оставив только имена
    const supplements = selectedSupplements.map(
      (supplement) => supplement.name
    );
    addProductToCart(dispatch, {
      slug,
      name,
      description,
      productPrice: totalPrice,
      weight: productWeight,
      img,
      isClassicPizza: true,
      isPizzaOrRolli: true,
      selectedAmount, // Передаем текущий размер товара
      supplements, // Массив добавок
    });
    setSelectedSupplements([]); // Очищаем массив добавок
    setTotalPrice(productPrice); // В totalPrice устанавливаем только цену самого товара(без добавок)
    setResetCheck(true); // Сбрасываем отмченные добавки

    // После того как resetCheck сработает, сбрасываем его обратно на null
    setTimeout(() => {
      setResetCheck(null);
    }, 10); // Сбрасываем на null через 10 миллисекунд
  });

  // Количество выбранных добавок
  const selectedCount = selectedSupplements.length;
  return (
    <div className="supplements-items__container">
      <div className="supplements__wrapper">
        <div className="supplements__info">
          <div className="supplements__info-img-container">
            <img className="supplements__info-img" src={img} alt={name} />
          </div>
          <div className="supplements__info-text">
            <h2 className="title--2">{name}</h2>
            <p className="supplements-weight__text">({productWeight} г)</p>
            <p className="supplements__descritpion">Состав: {description}</p>
          </div>
        </div>

        {/* Дополнительные ингрдиенты */}
        <div className="supplements__container">
          {toggleShow && (
            <div className="supplements__toggle-container">
              <Toggle
                size={size}
                subCat={subCat}
                selectedAmount={selectedAmount}
                handleChange={handleToggleChange}
              />
            </div>
          )}
          <div className="supplements__text">
            <p>Дополнительные ингредиенты</p>
            <div className="supplements__text-information">
              {selectedCount} / 10{" "}
              <FaInfoCircle
                className="info-circle-icon"
                onClick={handleInfoToggle}
              />
              <div
                className={clsx("supplements__text-information__popup", {
                  visible: showInfo,
                })}
              >
                Можно выбрать максимум 10
              </div>
            </div>
          </div>
          {supStatus === "loading" && <Loader />}
          {supError && <p className="text--error">{supError}</p>}
          {supStatus === "resolved" && (
            <ul className="supplements__list">
              {supplements.map((item) => (
                <ProductSupplementsItem
                  key={item.id}
                  name={item.name}
                  weight={item.weight}
                  price={item.price}
                  img={item.img}
                  updateTotalPrice={updateTotalPrice}
                  selectedCount={selectedCount} // Передаем количество выбранных добавок
                  productWeight={productWeight} // Передаем вес товара
                  resetCheck={resetCheck} // передаем значение для сброса отмеченных добавок
                />
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="btn-sup-container">
        <Button
          text={`В корзину за ${totalPrice} ₽`}
          handleClick={addProduct}
        />
      </div>
    </div>
  );
}
