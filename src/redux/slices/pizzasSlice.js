import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async (params, thunkAPI) => {
    const { pageCount, categoryId, searchValue, sortType } = params;
    const { data } = await axios.get(
      `https://661d8b6898427bbbef02188f.mockapi.io/items?page=${pageCount}&limit=8&${
        categoryId === 0 ? '' : `category=${categoryId}`
      }&sortBy=${sortType}${searchValue ? `&search=${searchValue}` : ''}`,
    );
    console.log('API', thunkAPI.getState());
    return data;
  },
);

const initialState = {
  items: [],
  status: 'loading',
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      console.log('pending');
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      console.log('ERROR', action.error);
      state.items = [];
      state.status = 'error';
    });
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
