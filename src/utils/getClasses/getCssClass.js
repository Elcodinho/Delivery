import clsx from "clsx";

// Функция переключения класса ошибки (При наличии error класс ошибки добавиться и наоборот)
export function getCssClass(error, baseClass, errorClass, element, length) {
  return clsx(baseClass, {
    [errorClass]: error || element.length > length,
  });
}
