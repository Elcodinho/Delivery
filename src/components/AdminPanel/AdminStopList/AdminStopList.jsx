import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useClearError } from "@hooks/useClearError";
import {
  editMenuItem,
  clearMenuStatus,
  clearMenuError,
} from "@store/menuSlice";
import { allowedSlugChars } from "@constants/constants";
import { AdminProductInput } from "../AdminProduct/AdminProductInput/AdminProductInput";
import { Button } from "@components/UI/Button/Button";
import { Confirmation } from "@components/UI/Popups/Confirmation/Confirmation";
import { WarningError } from "@components/UI/Warnings/WarningError/WarningError";
import { Loader } from "@components/UI/Loader/Loader";
import { Success } from "@components/UI/Popups/Success/Success";
import "./AdminStopList.css";

export function AdminStopList() {
  const [slug, setSlug] = useState("");
  const [slugError, setSlugError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleteValid, setIsDeleteValid] = useState(false);
  const [productStatus, setProductStatus] = useState("active");

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.menu);

  // Фукнция изменения slug
  function handleSlugChange(e) {
    const inputValue = e.target.value;
    if (allowedSlugChars.test(inputValue)) {
      setSlug(inputValue);
      setIsDeleteValid(inputValue.trim() !== "");
    }
  }

  // Функция изменения статуса товара
  function handleSubmit() {
    const data = slug.trim().toLowerCase();
    const value = productStatus === "active" ? false : true;
    dispatch(editMenuItem({ slug: data, value }));
  }

  // Функция очистки статуса
  function clearStatus() {
    dispatch(clearMenuStatus());
  }

  useClearError(error, clearMenuError, 6000); // Сбрасываем ошибку(и убираем сообщение) через время

  // Очистка поля формы
  useEffect(() => {
    if (status === "resolved") {
      setSlug("");
      setProductStatus("active");
      setSlugError(null);
    }
  }, [status]);

  return (
    <div className="stop-list">
      <h3 className="title--3 admin__main-title">Изменить статус товара</h3>
      {status === "loading" && <Loader />}
      {status === "resolved" && (
        <Success
          text="Статус товара успешно изменен"
          clearStatus={clearStatus}
        />
      )}
      {error && <WarningError warning={error} />}
      {showConfirm && (
        <Confirmation
          title="Внимание!"
          text="Вы действительно хотите изменить статус товара?"
          setShowConfirm={setShowConfirm}
          handleClear={handleSubmit}
        />
      )}
      <form className="stop-list__form">
        <AdminProductInput
          id="admin-edit-slug"
          value={slug}
          setValue={setSlug}
          valueError={slugError}
          setValueError={setSlugError}
          type="text"
          label="Slug"
          ariaLabel="Слаг товара"
          valueLength={60}
          info="Введите слаг товара (только латинские
            символы)"
          handleInputChange={handleSlugChange}
        />

        {/* Radio */}
        <div className="stop-list__radio-wrapper">
          <div className="stop-list__radio">
            <input
              type="radio"
              name="stop-list-radio"
              id="admin-product-active"
              checked={productStatus === "active"}
              value="active"
              onChange={(e) => setProductStatus(e.target.value)}
            />
            <label htmlFor="admin-product-active">Сделать товар активным</label>
          </div>
          <div className="stop-list__radio">
            <input
              type="radio"
              name="stop-list-radio"
              id="admin-product-disabled"
              checked={productStatus === "disabled"}
              value="disabled"
              onChange={(e) => setProductStatus(e.target.value)}
            />
            <label htmlFor="admin-product-disabled">
              Добавить товар в стоп-лист
            </label>
          </div>
        </div>
        <div className="stop-list__btn-container">
          <Button
            text="Изменить"
            cssClass="admin-product--add"
            handleClick={() => setShowConfirm(true)}
            disabled={!isDeleteValid}
          />
        </div>
      </form>
    </div>
  );
}
