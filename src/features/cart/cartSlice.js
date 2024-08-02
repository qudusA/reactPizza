import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  //   cart: [
  //     {
  //       pizzaId: 12,
  //       name: "matt",
  //       quantity: 2,
  //       unitPrice: 12,
  //       totalPrice: 32,
  //     },
  //   ]
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems(state, action) {
      const val = state.cart.findIndex(
        (item) => item.pizzaId === action.payload.pizzaId,
      );
      if (state.cart.length !== 0 && val !== -1) return state;
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    clearCartItems(state) {
      state.cart = [];
    },
    // addItems(state, action){},
  },
});

export const {
  addItems,
  clearCartItems,
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
} = cartSlice.actions;

export const getIsItemsAlreadyInCart = (id) => (state) =>
  state.cart.cart.find((cur) => cur.pizzaId === id)?.quantity ?? 0;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((acc, cur) => acc + cur.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((acc, cur) => acc + cur.totalPrice, 0);

export const getCart = (state) => state.cart.cart;

export const getUserName = (state) => state.user.name;

export default cartSlice.reducer;
