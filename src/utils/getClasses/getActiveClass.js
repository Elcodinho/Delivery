// Проверка активной ссылки для добавления ей класса
export function getActiveClass({ isActive }, baseClass, addClass) {
  return `${baseClass} ${isActive ? addClass : ""}`;
}
