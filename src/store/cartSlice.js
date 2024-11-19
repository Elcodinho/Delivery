import { createSlice } from "@reduxjs/toolkit";

// Функция для сравнения supplements
function compareSupplements(supplementsA, supplementsB) {
  if (!supplementsA && !supplementsB) return true;
  if (!supplementsA || !supplementsB) return false;

  // Сортируем массивы и сравниваем как строки
  const sortedA = supplementsA.sort().join(",");
  const sortedB = supplementsB.sort().join(",");

  return sortedA === sortedB;
}

const initialState = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newProduct = action.payload;

      // Найти товар с таким же slug и проверками
      const existingProductIndex = state.findIndex((item) => {
        // Для роллов проверяем и slug, и size
        if (item.slug === newProduct.slug && newProduct.subCat === "rolli") {
          return item.slug === newProduct.slug && item.size === newProduct.size;
        }

        // Для пиццы проверяем slug и size
        if (item.slug === newProduct.slug && item.isClassicPizza) {
          const sizeMatches =
            item.slug === newProduct.slug && item.size === newProduct.size;
          const supplementsMatch = compareSupplements(
            item.supplements,
            newProduct.supplements
          );
          // Если size или supplements не совпадают, то это разные товары
          return sizeMatches && supplementsMatch;
          // return item.slug === newProduct.slug && item.size === newProduct.size;
        }

        // Для остальных товаров только проверяем slug
        return item.slug === newProduct.slug;
      });

      if (existingProductIndex !== -1) {
        // Создаем копию объекта и обновляем количество
        state[existingProductIndex] = {
          ...state[existingProductIndex],
          amount: state[existingProductIndex].amount + newProduct.amount,
        };
      } else {
        // Добавляем новый товар
        state.push(newProduct);
      }
      // Обновляем localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const updatedCart = state.filter(
        (item) => item.slug !== action.payload.slug
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    },
    // Для инициализации корзины из localStorage при перезагрузке страницы
    setCart: (state, action) => {
      return action.payload;
    },
  },
});
export const { addToCart, removeFromCart, setCart } = cartSlice.actions;
export const selectCart = (state) => state.cart;
export default cartSlice.reducer;
