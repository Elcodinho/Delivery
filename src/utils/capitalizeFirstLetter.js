export function capitalizeFirstLetter(str) {
  if (!str) return ""; // Проверяем, что строка не пуста
  return str.charAt(0).toUpperCase() + str.slice(1);
}
