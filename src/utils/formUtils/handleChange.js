// Функция для контроля состояний и ввода данных в required инпуты (name,text)
export function handleChange(e, setData, error, setError) {
  setData(e.target.value);
  // Если ошибка есть, то при вводе мы ее сбрасываем (это позволяет убрать все стили и уведомления об ошибках, как только пользователь начинает вводить исправления)
  if (error) {
    setError(null);
  }
}
