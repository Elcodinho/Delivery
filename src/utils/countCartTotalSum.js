export function countCartTotalSum(cart) {
  if (!cart || cart.length === 0) return 0; // Проверка на пустую корзину
  const sum = cart
    .map((item) => item.amount * item.price)
    .reduce((acc, item) => acc + item, 0); // Сумма всех товаров в корзине
  return sum;
}
