const allowedEmailChars = /^[a-zA-Z0-9._%+-@]*$/; // Разрешенные символы для email

// Функция обновления email с фильтрацией неразрешённых символов
export function handleEmailChange(e, setEmail) {
  const inputValue = e.target.value;
  if (allowedEmailChars.test(inputValue)) {
    setEmail(inputValue);
  }
}
