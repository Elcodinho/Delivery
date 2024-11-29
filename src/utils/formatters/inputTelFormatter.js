// Маска для номера инпута с номером телефона

export function inputTelFormatter(e, setTel) {
  let value = e.target.value.replace(/[^0-9]/g, ""); // Удаляем все нецифровые символы

  // Ограничиваем длину строки, чтобы она не превышала 11 символов (включая код страны)
  if (value.length > 11) {
    value = value.slice(0, 11);
  }

  if (e.target.value === "+") {
    value = "";
    setTel(value);
    return;
  }

  // Форматируем строку в нужный формат: +7 999 999 99 99
  if (value.length <= 1 && value !== "7") {
    value = `+7 ${value}`;
  } else if (value.length <= 1 && value === "7") {
    value = "+7";
  } else if (value.length > 1 && value.length <= 4) {
    value = `+7 ${value.slice(1, 4)}`;
  } else if (value.length <= 7) {
    value = `+7 ${value.slice(1, 4)} ${value.slice(4, 7)}`;
  } else if (value.length <= 9) {
    value = `+7 ${value.slice(1, 4)} ${value.slice(4, 7)} ${value.slice(7, 9)}`;
  } else {
    value = `+7 ${value.slice(1, 4)} ${value.slice(4, 7)} ${value.slice(
      7,
      9
    )} ${value.slice(9, 11)}`;
  }

  setTel(value);
}
