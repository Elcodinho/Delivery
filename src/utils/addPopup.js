// Добавляем popup с именем
export function addPopup(name, setPopups) {
  setPopups((prev) => [...prev, name]); // Добавляем имя в массив
  setTimeout(() => {
    setPopups((prev) => prev.slice(1)); // Удаляем первый через 2 секунды
  }, 3000);
}
