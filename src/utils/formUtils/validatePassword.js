// Функция валидации пароля
export function validatePassword(password, setPassError) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;"'<>,.?~`-]{6,}$/;
  if (!passwordRegex.test(password)) {
    setPassError(
      "Пароль должен быть не менее 6 символов, содержать заглавные и строчные буквы, а также хотя бы одну цифру"
    );
    return false;
  }
  setPassError(null);
  return true;
}
