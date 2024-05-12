import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItemT = {
  id: string;
  imageUrl: string;
  type: string;
  title: string;
  count: number;
  price: number;
  size: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItemT[];
}

const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addItems(state, action) {
    //   state.items.push(action.payload);
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price + sum;
    //   }, 0);
    // },
    addItems(state, action: PayloadAction<CartItemT>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      //   console.log('+++', findItem);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeItems(state, action: PayloadAction<string>) {
      if (window.confirm('Уверен...?')) {
        state.items = state.items.filter((obj) => obj.id !== action.payload);
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) findItem.count--;
      if (findItem?.count === 0) {
        state.items = state.items.filter((obj) => obj.id !== action.payload);
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    plusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) findItem.count--;

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
  },
});

export const { addItems, removeItems, clearItems, minusItem, plusItem } = cartSlice.actions;

export default cartSlice.reducer;
