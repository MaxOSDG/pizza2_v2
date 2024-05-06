import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    addItems(state, action) {
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
    removeItems(state, action) {
      if (window.confirm('Точно...?')) {
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
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      //   console.log(findItem);
      if (findItem.count > 0) {
        findItem.count--;
      }

      if (findItem.count === 0) {
        console.log('000000000000000000000000000', state);
        removeItems(state.id);
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
  },
});

export const { addItems, removeItems, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
