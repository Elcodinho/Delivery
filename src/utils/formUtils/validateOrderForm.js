import { validateEmail } from "@utils/validateEmail";

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
}) {
  let isValid = true;

  // Проверка обязательных полей
  if (name.trim() === "") {
    setNameError(true);
    isValid = false;
  }

  if (phone.trim() === "") {
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

  // Если форма не валидна, выходим
  if (!isValid) return false;

  // Формирование данных формы
  const formData = {
    name: name.trim(),
    phone: phone.trim(),
    ...(email.trim() && { email: email.trim() }),
    ...(comment.trim() && { comment: comment.trim() }),
    deliveryType,
    ...(deliveryType === "pickup" && { point: pickupPoint }),
    ...(deliveryType === "delivery" && {
      street: street.trim(),
      house: house.trim(),
      buildingType,
      ...(buildingType === "flat" && {
        flatNum: flatNum.trim(),
        ...(entrance.trim() && { entrance: entrance.trim() }),
        ...(floor.trim() && { floor: floor.trim() }),
        ...(intercom.trim() && { intercom: intercom.trim() }),
      }),
    }),
  };

  return formData;
}
