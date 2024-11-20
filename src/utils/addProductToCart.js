import { addToCart } from "@store/cartSlice";

// Общая функция добавления товара в корзину
export function addProductToCart(
  dispatch,
  {
    slug,
    name,
    description,
    productPrice,
    weight,
    img,
    subCat,
    isClassicPizza,
    isPizzaOrRolli,
    selectedAmount,
    supplements = [],
  }
) {
  const data = {
    slug,
    name,
    description,
    amount: 1,
    price: productPrice,
    weight,
    image: img,
    ...(subCat === "rolli" && { subCat }), // Добавляем subCat только если subCat === 'rolli'
    ...(isClassicPizza && { isClassicPizza: true }), // Проверка пиццы на классическую
    ...(isPizzaOrRolli && { size: selectedAmount }), // Добавляем size для роллов и классической пиццы
    ...(supplements.length > 0 && { supplements }), // Добавляем supplements только если они есть
  };

  dispatch(addToCart(data));
}
