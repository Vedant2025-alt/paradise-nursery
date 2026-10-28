import { createSlice } from '@reduxjs/toolkit';

// Each item: { name, image, description, cost (number), quantity }
const initialState = { items: [] };

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { name, image, description, cost } = action.payload;
      const existing = state.items.find((i) => i.name === name);
      if (existing) {
        existing.quantity++;
      } else {
        state.items.push({ name, image, description, cost, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.name !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find((i) => i.name === name);
      if (item) item.quantity = quantity;
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
