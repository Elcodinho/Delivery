import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setRecommendedItems,
  deleteRecommendItems,
  clearRecommendError,
  clearRecommendStatus,
  clearDeleteRecommendError,
  clearDeleteRecommendStatus,
} from "@store/recommendSLice";
import { useClearError } from "@hooks/useClearError";
import { AdminProductInput } from "../AdminProduct/AdminProductInput/AdminProductInput";
import { Button } from "@components/UI/Button/Button";
import { Loader } from "@components/UI/Loader/Loader";
import { WarningError } from "@components/UI/Warnings/WarningError/WarningError";
import { Success } from "@components/UI/Popups/Success/Success";
import { Confirmation } from "@components/UI/Popups/Confirmation/Confirmation";
import "./AdminRecommends.css";

export function AdminRecommends() {
  const [list, setList] = useState("");
  const [deleteSlug, setDeleteSlug] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [valid, setValid] = useState(false);
  const [deleteSlugValid, setDeleteSlugValid] = useState(false);

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.recommend);
  const { deleteStatus, deleteError } = useSelector((state) => state.recommend);

  function handleListChange(e) {
    const inputValue = e.target.value;
    setList(inputValue);
    setValid(inputValue.trim() !== "");
  }

  function handleDeleteSlugChange(e) {
    const inputValue = e.target.value;
    setDeleteSlug(inputValue);
    setDeleteSlugValid(inputValue.trim() !== "");
  }

  // Функция отправки формы ДОБАВЛЕНИЯ  товара
  function handleSubmit(e) {
    e.preventDefault();
    const listArr = list.split(",").filter((item) => item.trim() !== "");
    const dataList = listArr.map((item) => item.trim().toLowerCase());
    dispatch(setRecommendedItems(dataList));
  }

  // Функция отправки формы УДАЛЕНИЯ товара
  function handleDeleteSubmit() {
    const data = deleteSlug.trim().toLowerCase();
    dispatch(deleteRecommendItems(data));
  }

  // Очистка статуса добавления товара
  function clearStatus() {
    dispatch(clearRecommendStatus());
  }

  // Очистка статуса удаления товара
  function clearDeleteStatus() {
    dispatch(clearDeleteRecommendStatus());
  }

  // Очистка ошибки
  useClearError(error, clearRecommendError, 6000); // Сбрасываем ошибку добавления(и убираем сообщение) через время
  useClearError(deleteError, clearDeleteRecommendError, 6000); // Сбрасываем ошибку удаления товара(и убираем сообщение) через время

  // Очистка поля формы
  useEffect(() => {
    if (status === "resolved") {
      setList("");
    }
    if (deleteStatus === "resolved") {
      setDeleteSlug("");
    }
  }, [status, deleteStatus]);

  return (
    <div className="admin-recommend__wrapper">
      {(status === "loading" || deleteStatus === "loading") && <Loader />}
      {status === "resolved" && (
        <Success text="Товары успешно добавлены" clearStatus={clearStatus} />
      )}
      {deleteStatus === "resolved" && (
        <Success text="Товар успешно удален" clearStatus={clearDeleteStatus} />
      )}
      {error && <WarningError warning={error} />}
      {deleteError && <WarningError warning={deleteError} />}
      {showConfirm && (
        <Confirmation
          title="Внимание!"
          text="Вы действительно хотите удалить товар?"
          setShowConfirm={setShowConfirm}
          handleClear={handleDeleteSubmit}
        />
      )}
      <h3 className="admin__main-title title--3">
        Добавить или удалить товар из списка рекомендованных
      </h3>
      <p className="admin-recommend__subtitle">
        Добавить товар(ы) в список рекомендованных
      </p>
      <form className="admin-recommend__form" onSubmit={handleSubmit}>
        <AdminProductInput
          id="admin-delete-slug"
          value={list}
          setValue={setList}
          type="text"
          label="Список товаров"
          ariaLabel="Список товаров"
          valueLength={500}
          info="Введите слаг каждого товара через запятую (только латинские символы)"
          cssClass="admin__input-group--w"
          handleInputChange={handleListChange}
        />

        <div className="admin-recommend__btn-container">
          <Button
            text="Добавить"
            type="submit"
            cssClass="admin-product--delete"
            disabled={!valid}
          />
        </div>
      </form>
      <p className="admin-recommend__subtitle">
        Удалить товар из списка рекомендованных
      </p>
      <form className="admin-recommend__form">
        <AdminProductInput
          id="admin-delete-slug"
          value={deleteSlug}
          setValue={setDeleteSlug}
          type="text"
          label="Slug товара"
          ariaLabel="Slug товара"
          valueLength={60}
          info="Введите слаг товара, который вы хотите удалить из рекомендованных (только один слаг, только латинские символы)"
          cssClass="admin__input-group--w"
          handleInputChange={handleDeleteSlugChange}
        />

        <div className="admin-recommend__btn-container">
          <Button
            text="Удалить"
            cssClass="admin-product--delete"
            handleClear={clearDeleteStatus}
            disabled={!deleteSlugValid}
            handleClick={() => setShowConfirm(true)}
          />
        </div>
      </form>
    </div>
  );
}
