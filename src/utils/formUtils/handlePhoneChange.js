import { inputTelFormatter } from "@utils/formatters/inputTelFormatter";

// Функция для ввода номера телефона
export function handlePhoneChange(e, phoneError, setPhoneError, setPhone) {
  if (phoneError) {
    setPhoneError(null);
  }
  inputTelFormatter(e, setPhone);
}
