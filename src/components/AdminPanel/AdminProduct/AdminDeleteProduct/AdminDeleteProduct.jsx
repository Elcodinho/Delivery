import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useClearError } from "@hooks/useClearError";
import {
  deleteMenuItem,
  clearDeleteMenuError,
  clearDeleteMenuStatus,
} from "@store/menuSlice";
import { AdminProductInput } from "../AdminProductInput/AdminProductInput";
import { Button } from "@components/UI/Button/Button";
import { Confirmation } from "@components/UI/Popups/Confirmation/Confirmation";
import { WarningError } from "@components/UI/Warnings/WarningError/WarningError";
import { Loader } from "@components/UI/Loader/Loader";
import { Success } from "@components/UI/Popups/Success/Success";
import "./AdminDeleteProduct.css";

export function AdminDeleteProduct({ allowedChars }) {
  const [slug, setSlug] = useState("");
  const [slugError, setSlugError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleteValid, setIsDeleteValid] = useState(false);

  const dispatch = useDispatch();
  const { deleteStatus, deleteError } = useSelector((state) => state.menu);

  // Фукнция изменения slug
  function handleSlugChange(e) {
    const inputValue = e.target.value;
    if (allowedChars.test(inputValue)) {
      setSlug(inputValue);
      setIsDeleteValid(inputValue.trim() !== "");
    }
  }

  // Функция удаления товара из меню
  function test() {
    const data = slug.trim();
    dispatch(deleteMenuItem(data));
  }

  function clearStatus() {
    dispatch(clearDeleteMenuStatus());
  }
  useClearError(deleteError, clearDeleteMenuError, 6000); // Сбрасываем ошибку(и убираем сообщение) через время

  // Очистка поля формы
  useEffect(() => {
    if (deleteStatus === "resolved") {
      setSlug("");
      setSlugError(null);
    }
  }, [deleteStatus]);

  return (
    <>
      {deleteStatus === "loading" && <Loader />}
      {deleteStatus === "resolved" && (
        <Success text="Товар успешно удален" clearStatus={clearStatus} />
      )}
      {deleteError && <WarningError warning={deleteError} />}
      <form className="admin-product__form-delete">
        {showConfirm && (
          <Confirmation
            title="Внимание!"
            text="Вы действительно хотите удалить товар?"
            setShowConfirm={setShowConfirm}
            handleClear={test}
          />
        )}
        <AdminProductInput
          id="admin-delete-slug"
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
          cssClass="admin__input-group--w"
          handleInputChange={handleSlugChange}
        />
        <div className="admin-product-delete__btn-container">
          <Button
            text="Удалить товар"
            cssClass="admin-product--delete"
            handleClick={() => setShowConfirm(true)}
            disabled={!isDeleteValid}
          />
        </div>
      </form>
    </>
  );
}
