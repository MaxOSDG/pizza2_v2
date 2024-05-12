import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { CartItemT } from './cartSlice';

type FetchPizzasArgsT = {
  pageCount: number;
  categoryId: number;
  searchValue: string;
  sortType: number;
};

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async (params: FetchPizzasArgsT, thunkAPI) => {
    const { pageCount, categoryId, searchValue, sortType } = params;
    const { data } = await axios.get(
      `https://661d8b6898427bbbef02188f.mockapi.io/items?page=${pageCount}&limit=8&${
        categoryId === 0 ? '' : `category=${categoryId}`
      }&sortBy=${sortType}${searchValue ? `&search=${searchValue}` : ''}`,
    );
    console.log('API', thunkAPI.getState());
    return data as Pizza[];
  },
);

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
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
    builder.addCase(fetchPizzas.pending, (state) => {
      console.log('pending');
      state.status = Status.LOADING;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      console.log('ERROR', action.error);
      state.items = [];
      state.status = Status.ERROR;
    });
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
