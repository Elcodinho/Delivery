import { useState, useCallback, useEffect } from "react";
import clsx from "clsx";
import { PIZZASIZE, ROLLIAMOUNT } from "@constants/constants";
import { AdminProductSelect } from "./AdminProductSelect/AdminProductSelect";
import { AdminProductInput } from "./AdminProductInput/AdminProductInput";
import { WeightPrice } from "./WeightPrice/WeightPrice";
import { Button } from "@components/UI/Button/Button";
import { WarningError } from "@components/UI/Warnings/WarningError/WarningError";
import "./AdminProduct.css";

const categories = [
  { name: "Суши и роллы", value: "sushi-i-rolli" },
  { name: "Пицца", value: "pizza" },
  { name: "Бургеры", value: "burgeri" },
];

const subCats = [
  { name: "Роллы", value: "rolli" },
  { name: "Суши", value: "sushi" },
];

const rolliTypes = [
  { name: "Классические", value: "classic" },
  { name: "Запеченные", value: "hot" },
];

const pizzaTypes = [
  { name: "Классическая", value: "classic" },
  { name: "Римская", value: "rimskaya" },
];

export function AdminProduct() {
  const { small: pizzaSize, large: largePizzaSize } = PIZZASIZE; // Размер обычной и большой пиццы
  const { small: rolliSize, large: largeRolliSize } = ROLLIAMOUNT; // Кол-во ролов (4 или 8 в днном случае)
  const rolliTitle = `Укажите вес и цену для ${rolliSize}шт роллов`;
  const rolliLargeTitle = `Укажите вес и цену для ${largeRolliSize}шт роллов`;
  const pizzaTitle = `Укажите вес и цену для пиццы размером ${pizzaSize}см`;
  const pizzaLargeTitle = `Укажите вес и цену для пиццы размером ${largePizzaSize}см`;

  const [category, setCategory] = useState(""); // Категоря товара
  const [subCat, setSubCat] = useState(""); // Подкатегория товара
  const [type, setType] = useState(""); // Тип товара
  const [slug, setSlug] = useState(""); // slug товара для url
  const [img, setImg] = useState(""); // Ссылка на изображение товара
  const [description, setDescription] = useState(""); // Описание товара
  const [weight, setWeight] = useState(""); // Вес товара
  const [price, setPrice] = useState(""); // Цена товара
  const [largeWeight, setLargeWeight] = useState("");
  const [largePrice, setLargePrice] = useState("");

  // Состояние ошибок
  const [categoryError, setCategoryError] = useState(null);
  const [subCatError, setSubCatError] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [slugError, setSlugError] = useState(null);
  const [imgError, setImgError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [weightError, setWeightError] = useState(null);
  const [priceError, setPriceError] = useState(null);
  const [largeWeightError, setLargeWeightError] = useState(null);
  const [largePriceError, setLargePriceError] = useState(null);

  const isRolli = subCat === "rolli";
  const isClassicPizza = category === "pizza" && type === "classic";

  const allowedSlugChars = /^[a-zA-Z_-]*$/;

  // Фукнция изменения slug
  const handleSlugChange = useCallback((e) => {
    const inputValue = e.target.value;
    if (allowedSlugChars.test(inputValue)) {
      setSlug(inputValue);
    }
  }, []);

  // Сбрасываем подкатегорию и тип при изменении категории
  useEffect(() => {
    setSubCat(""); // Сбрасываем подкатегорию
    setType(""); // Сбрасываем тип товара
  }, [category]);

  return (
    <div className="admin-product__wrapper">
      <h3 className="admin-product__title title--3">Добавить новый товар</h3>
      <form className="admin-product__form">
        <AdminProductSelect
          value={category}
          setValue={setCategory}
          valueError={categoryError}
          setValueError={setCategoryError}
          dataValues={categories}
          selectText="Выберите категорию товара"
          warning="Выберете категорию товара"
        />
        {category === "sushi-i-rolli" && (
          <AdminProductSelect
            value={subCat}
            setValue={setSubCat}
            valueError={subCatError}
            setValueError={setSubCatError}
            dataValues={subCats}
            selectText="Выберите подкатегорию товара"
            warning="Выберете подкатегорию товара"
          />
        )}
        {(subCat === "rolli" || category === "pizza") && (
          <AdminProductSelect
            value={type}
            setValue={setType}
            valueError={typeError}
            setValueError={setTypeError}
            dataValues={subCat === "rolli" ? rolliTypes : pizzaTypes}
            selectText="Выберите тип товара"
            warning="Выберете тип товара"
          />
        )}
        <div className="admin-product__inputs-wrapper">
          <AdminProductInput
            id="admin-slug"
            value={slug}
            setValue={setSlug}
            valueError={slugError}
            setValueError={setSlugError}
            type="text"
            label="Slug"
            ariaLabel="Слаг товара"
            valueLength={60}
            info="Введите уникальный слаг товара (только латинские
          символы)"
            handleInputChange={handleSlugChange}
          />
          <AdminProductInput
            id="admin-img"
            value={img}
            setValue={setImg}
            valueError={imgError}
            setValueError={setImgError}
            type="text"
            label="Изображение"
            ariaLabel="Ссылка на изображение товара"
            valueLength={500}
            info="Вставьте ссылку на изображение товара"
          />
          <AdminProductInput
            id="admin-desc"
            value={description}
            setValue={setDescription}
            valueError={descriptionError}
            setValueError={setDescriptionError}
            type="text"
            label="Описание"
            ariaLabel="Описание товара"
            valueLength={200}
            info="Добавьте описание товара (состав)"
          />
        </div>
        <div
          className={clsx("admin__weight-price-wrapper", {
            "weight-price--direction": isClassicPizza || isRolli,
          })}
        >
          <WeightPrice
            weight={weight}
            setWeight={setWeight}
            price={price}
            setPrice={setPrice}
            weightError={weightError}
            setWeightError={setWeightError}
            priceError={priceError}
            setPriceError={setPriceError}
            title={isRolli ? rolliTitle : isClassicPizza ? pizzaTitle : ""}
          />
          {(isRolli || isClassicPizza) && (
            <WeightPrice
              weight={largeWeight}
              setWeight={setLargeWeight}
              price={largePrice}
              setPrice={setLargePrice}
              weightError={largeWeightError}
              setWeightError={setLargeWeightError}
              priceError={largePriceError}
              setPriceError={setLargePriceError}
              title={isRolli ? rolliLargeTitle : pizzaLargeTitle}
            />
          )}
        </div>
        <div className="admin-product__buttons-wrapper">
          <Button text="Добавить товар" cssClass="admin-product--add" />
        </div>
      </form>
    </div>
  );
}
