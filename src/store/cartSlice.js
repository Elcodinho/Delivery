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
      const newProduct = {
        ...action.payload,
        cartId: action.payload.cartId || `${action.payload.slug}_${Date.now()}`,
      };

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
    // Обновление товара в корзине
    updateProductAmount: (state, action) => {
      const { cartId, amount } = action.payload;

      const existingProductIndex = state.findIndex(
        (item) => item.cartId === cartId
      );

      if (existingProductIndex !== -1) {
        if (amount < 1) {
          // Удаляем товар, если количество меньше 1
          state.splice(existingProductIndex, 1);
        } else {
          // Обновляем количество
          state[existingProductIndex].amount = amount;
        }
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    // Функция удаления товара из корзины
    removeFromCart: (state, action) => {
      const updatedCart = state.filter(
        (item) => item.cartId !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    },
    // Функция очистки всей корзины
    clearCart: (state) => {
      state.length = 0; // Очищаем состояние корзины
      localStorage.removeItem("cart"); // Удаляем корзину из localStorage
    },

    // Для инициализации корзины из localStorage при перезагрузке страницы
    setCart: (action) => {
      return action.payload;
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  updateProductAmount,
  clearCart,
  setCart,
} = cartSlice.actions;
export const selectCart = (state) => state.cart;
export default cartSlice.reducer;
