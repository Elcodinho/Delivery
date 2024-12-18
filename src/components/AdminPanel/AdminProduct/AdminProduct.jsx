import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { addMenuItem } from "@store/menuSlice";
import { clearMenuError, clearMenuStatus } from "@store/menuSlice";
import { allowedSlugChars } from "@constants/constants";
import { useClearError } from "@hooks/useClearError";
import { submitAdminProduct } from "@utils/formUtils/submitAdminProduct";
import { PIZZASIZE, ROLLIAMOUNT } from "@constants/constants";
import { AdminDeleteProduct } from "./AdminDeleteProduct/AdminDeleteProduct";
import { AdminProductSelect } from "./AdminProductSelect/AdminProductSelect";
import { AdminProductInput } from "./AdminProductInput/AdminProductInput";
import { WeightPrice } from "./WeightPrice/WeightPrice";
import { Button } from "@components/UI/Button/Button";
import { Loader } from "@components/UI/Loader/Loader";
import { Success } from "@components/UI/Popups/Success/Success";
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

  const dispatch = useDispatch();
  const { status: addMenuStatus, error: addMenuError } = useSelector(
    (state) => state.menu
  ); // Статус и ошибка запроса добавления товара

  const [name, setName] = useState(""); // Название товара
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
  const [nameError, setNameError] = useState(null);
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

  // Функция отправки формы
  function handleSubmit(e) {
    e.preventDefault();
    submitAdminProduct({
      name,
      category,
      subCat,
      type,
      slug,
      img,
      description,
      weight,
      price,
      largeWeight,
      largePrice,
      pizzaSize,
      largePizzaSize,
      rolliSize,
      largeRolliSize,
      setNameError,
      setCategoryError,
      setSubCatError,
      setTypeError,
      setSlugError,
      setImgError,
      setDescriptionError,
      setWeightError,
      setPriceError,
      setLargeWeightError,
      setLargePriceError,
      isRolli,
      isClassicPizza,
      dispatch,
      addMenuItem,
    });
  }

  // Функция сброса ошибо всех полей
  function resetError() {
    setNameError(null);
    setCategoryError(null);
    setSubCatError(null);
    setTypeError(null);
    setSlugError(null);
    setImgError(null);
    setDescriptionError(null);
    setWeightError(null);
    setPriceError(null);
    setLargeWeightError(null);
    setLargePriceError(null);
  }

  // Функция очистки формы
  function clearForm() {
    setName("");
    setCategory("");
    setSubCat("");
    setType("");
    setSlug("");
    setImg("");
    setDescription("");
    setWeight("");
    setPrice("");
    setLargePrice("");
    setLargeWeight("");
  }

  useEffect(() => {
    if (addMenuStatus === "resolved") {
      resetError();
      clearForm();
    }
  }, [addMenuStatus]);

  // Очистка статуса запроса отправки отзыва
  function clearStatus() {
    dispatch(clearMenuStatus());
  }
  useClearError(addMenuError, clearMenuError, 6000);

  return (
    <div className="admin-product__wrapper">
      {addMenuStatus === "loading" && <Loader />}
      {addMenuStatus === "resolved" && (
        <Success text="Товар успешно добавлен" clearStatus={clearStatus} />
      )}
      {addMenuError && <WarningError warning={addMenuError} />}
      <h3 className="admin__main-title title--3">Добавить новый товар</h3>
      <form className="admin-product__form" onSubmit={handleSubmit}>
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
            id="admin-name"
            value={name}
            setValue={setName}
            valueError={nameError}
            setValueError={setNameError}
            type="text"
            label="Название товара"
            ariaLabel="Название товара"
            valueLength={60}
            info="Введите название товара"
          />
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
            idPrice="admin-price"
            idWeight="admin-weight"
            weight={weight}
            setWeight={setWeight}
            price={price}
            setPrice={setPrice}
            weightError={weightError}
            setWeightError={setWeightError}
            priceError={priceError}
            setPriceError={setPriceError}
            extraLabel="товара"
            title={isRolli ? rolliTitle : isClassicPizza ? pizzaTitle : ""}
          />
          {(isRolli || isClassicPizza) && (
            <WeightPrice
              idPrice="admin-price-large"
              idWeight="admin-weight-large"
              weight={largeWeight}
              setWeight={setLargeWeight}
              price={largePrice}
              setPrice={setLargePrice}
              weightError={largeWeightError}
              setWeightError={setLargeWeightError}
              priceError={largePriceError}
              setPriceError={setLargePriceError}
              extraLabel="товара"
              title={isRolli ? rolliLargeTitle : pizzaLargeTitle}
            />
          )}
        </div>
        <div className="admin-product__buttons-wrapper">
          <Button
            text="Добавить товар"
            cssClass="admin-product--add"
            type="submit"
          />
        </div>
      </form>
      <h3 className="admin-product__title title--3">Удалить товар</h3>
      <AdminDeleteProduct allowedChars={allowedSlugChars} />
    </div>
  );
}
