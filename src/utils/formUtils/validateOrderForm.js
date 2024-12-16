import { validateEmail } from "@utils/formUtils/validateEmail";

// Функция валидации формы заказа
export function validateOrderForm({
  name,
  phone,
  email,
  comment,
  deliveryType,
  pickupPoint,
  street,
  house,
  buildingType,
  flatNum,
  entrance,
  floor,
  intercom,
  setNameError,
  setPhoneError,
  setEmailError,
  setStreetError,
  setHouseError,
  setFlatNumError,
  setPickupPointError,
  formRef,
}) {
  let isValid = true;

  // Проверка обязательных полей
  if (name.trim() === "") {
    setNameError(true);
    isValid = false;
  }

  if (phone.trim() === "" || (phone.length > 0 && phone.length < 16)) {
    setPhoneError(true);
    isValid = false;
  }

  if (deliveryType === "delivery") {
    if (street.trim() === "") {
      setStreetError(true);
      isValid = false;
    }

    if (house.trim() === "") {
      setHouseError(true);
      isValid = false;
    }

    if (buildingType === "flat" && flatNum.trim() === "") {
      setFlatNumError(true);
      isValid = false;
    }
  }

  if (deliveryType === "pickup" && pickupPoint === "") {
    setPickupPointError(true);
    isValid = false;
  }

  if (email.trim() !== "" && !validateEmail(email)) {
    setEmailError(true);
    isValid = false;
  }

  // Если форма не валидна, выполняем скролл к началу формы
  if (!isValid) {
    if (formRef && formRef.current) {
      const topPosition =
        formRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: topPosition - 70, behavior: "smooth" });
    }
    return false;
  }

  // Формирование данных формы
  const formData = {
    name: name.trim().toLowerCase(),
    phone: phone.replace(/\s+/g, "").trim(),
    ...(email.trim() && { email: email.trim().toLowerCase() }),
    ...(comment.trim() && { comment: comment.trim().toLowerCase() }),
    deliveryType,
    ...(deliveryType === "pickup" && { point: pickupPoint.toLowerCase() }),
    ...(deliveryType === "delivery" && {
      adress: {
        street: street.trim().toLowerCase(),
        house: house.trim().toLowerCase(),
        buildingType,
        ...(buildingType === "flat" && {
          flatNum: flatNum.trim().toLowerCase(),
          ...(entrance.trim() && { entrance: entrance.trim().toLowerCase() }),
          ...(floor.trim() && { floor: floor.trim().toLowerCase() }),
          ...(intercom.trim() && { intercom: intercom.trim().toLowerCase() }),
        }),
      },
    }),
  };

  return formData;
}
