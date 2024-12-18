import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSupStatus,
  clearDeleteSupError,
  clearDeleteSupStatus,
  clearSupError,
  addSupplement,
  deleteSupplement,
} from "@store/supplementSlice";
import { useClearError } from "@hooks/useClearError";
import { submitAdminSupplements } from "@utils/formUtils/submitAdminSupplements";
import { WeightPrice } from "../AdminProduct/WeightPrice/WeightPrice";
import { AdminProductInput } from "../AdminProduct/AdminProductInput/AdminProductInput";
import { Button } from "@components/UI/Button/Button";
import { Loader } from "@components/UI/Loader/Loader";
import { WarningError } from "@components/UI/Warnings/WarningError/WarningError";
import { Success } from "@components/UI/Popups/Success/Success";
import { Confirmation } from "@components/UI/Popups/Confirmation/Confirmation";
import "./AdminSupplements.css";

export function AdminSupplements() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(""); // Вес товара
  const [price, setPrice] = useState(""); // Цена товара
  const [img, setImg] = useState(""); // Ссылка на изображение товара
  const [deleteId, setDeleteId] = useState(""); // id для удаления добавки
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleteValid, setIsDeleteValid] = useState(false);

  const [idError, setIdError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [imgError, setImgError] = useState(null);
  const [weightError, setWeightError] = useState(null);
  const [priceError, setPriceError] = useState(null);

  const dispatch = useDispatch();
  const { status, error, deleteStatus, deleteError } = useSelector(
    (state) => state.supplement
  );

  // Фукнция изменения deleteID
  const handleDeleteIdChange = useCallback(
    (e) => {
      const inputValue = e.target.value;
      setDeleteId(inputValue);
      setIsDeleteValid(inputValue.trim() !== "");
    },
    [setDeleteId, setIsDeleteValid]
  );

  // Функция сброса ошибо всех полей
  function resetError() {
    setIdError;
    setNameError(null);
    setImgError(null);
    setWeightError(null);
    setPriceError(null);
  }

  // Функция очистки формы
  function clearForm() {
    setId("");
    setName("");
    setImg("");
    setWeight("");
    setPrice("");
  }

  // Функция отправки формы ДОБАВЛЕНИЯ добвки
  function handleSubmit(e) {
    e.preventDefault();
    submitAdminSupplements({
      id,
      name,
      img,
      weight,
      price,
      setIdError,
      setNameError,
      setImgError,
      setWeightError,
      setPriceError,
      dispatch,
      addSupplement,
    });
  }

  // Функция отправки формы УДАЛЕНИЯ добавки
  function handleDeleteSubmit() {
    const data = deleteId.trim().toLowerCase();
    dispatch(deleteSupplement(data));
  }

  // Очитска и сброс ошибок формы
  useEffect(() => {
    if (status === "resolved") {
      resetError();
      clearForm();
    }
  }, [status]);

  // Очистка статуса добавления товара
  function clearStatus() {
    dispatch(clearSupStatus());
  }

  // Очистка статуса удаления товара
  function clearDeleteStatus() {
    dispatch(clearDeleteSupStatus());
  }

  // Очистка ошибки
  useClearError(error, clearSupError, 6000); // Сбрасываем ошибку добавления(и убираем сообщение) через время
  useClearError(deleteError, clearDeleteSupError, 6000); // Сбрасываем ошибку удаления товара(и убираем сообщение) через время

  return (
    <div className="admin-supplements__wrapper">
      {(status === "loading" || deleteStatus === "loading") && <Loader />}
      {status === "resolved" && (
        <Success
          text="Доп. ингредиент успешно добавлены"
          clearStatus={clearStatus}
        />
      )}
      {deleteStatus === "resolved" && (
        <Success
          text="Добавка успешно удалена"
          clearStatus={clearDeleteStatus}
        />
      )}
      {error && <WarningError warning={error} />}
      {deleteError && <WarningError warning={deleteError} />}
      {showConfirm && (
        <Confirmation
          title="Внимание!"
          text="Вы действительно хотите удалить добавку?"
          setShowConfirm={setShowConfirm}
          handleClear={handleDeleteSubmit}
        />
      )}
      <h3 className="admin__main-title title--3">
        Добавить или удалить дополнительный ингредиент
      </h3>
      <p className="admin-recommend__subtitle">
        Добавить дополнительный ингредиент
      </p>
      <form className="admin-supplements__form" onSubmit={handleSubmit}>
        <div className="admin-supplements__inputs-wrapper">
          <AdminProductInput
            id="admin-sup-name"
            value={name}
            setValue={setName}
            valueError={nameError}
            setValueError={setNameError}
            type="text"
            label="Название добавки"
            ariaLabel="Название добавки"
            valueLength={60}
            info="Введите название добавки"
          />
          <AdminProductInput
            id="admin-sup-img"
            value={img}
            setValue={setImg}
            valueError={imgError}
            setValueError={setImgError}
            type="text"
            label="Изображение"
            ariaLabel="Ссылка на изображение добавки"
            valueLength={500}
            info="Вставьте ссылку на изображение добавки"
          />
          <WeightPrice
            idPrice="admin-sup-price"
            idWeight="admin-sup-weight"
            weight={weight}
            setWeight={setWeight}
            price={price}
            setPrice={setPrice}
            weightError={weightError}
            setWeightError={setWeightError}
            priceError={priceError}
            setPriceError={setPriceError}
            extraLabel="добавки"
          />
          <AdminProductInput
            id="admin-sup-id"
            value={id}
            setValue={setId}
            valueError={idError}
            setValueError={setIdError}
            type="text"
            label="ID добавки"
            ariaLabel="ID добавки"
            valueLength={30}
            info="Введите уникальный идентификатор добавки (ID)"
          />
        </div>
        <div className="admin-supplements__buttons-wrapper">
          <Button text="Добавить" cssClass="admin-product--add" type="submit" />
        </div>
      </form>

      <p className="admin-recommend__subtitle">
        Удалить дополнительный ингредиент
      </p>
      <form className="admin-product__form-delete">
        <AdminProductInput
          id="admin-delete-slug"
          value={deleteId}
          setValue={setDeleteId}
          type="text"
          label="ID добавки"
          ariaLabel="ID добавки"
          valueLength={30}
          info="Введите уникальный идентификатор добавки (ID)"
          cssClass="admin__input-group--w"
          handleInputChange={handleDeleteIdChange}
        />
        <div className="admin-product-delete__btn-container">
          <Button
            text="Удалить добавку"
            cssClass="admin-product--delete"
            handleClick={() => setShowConfirm(true)}
            disabled={!isDeleteValid}
          />
        </div>
      </form>
    </div>
  );
}
