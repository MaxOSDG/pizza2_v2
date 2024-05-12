import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SortT = {
  name: string;
  sortProperty: 'rating' | 'price' | 'title';
};

interface FilterSliceState {
  categoryId: number;
  pageCount: number;
  sort: SortT;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  pageCount: 1,
  sort: { name: 'популярности', sortProperty: 'rating' },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<SortT>) {
      state.sort = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setFilters(state, action) {
      //: PayloadAction<FilterSliceState>
      state.categoryId = Number(action.payload.categoryId);
      state.pageCount = Number(action.payload.pageCount);
      state.sort.sortProperty = action.payload.sort.sortProperty;
    },
  },
});

export const { setCategoryId, setSort, setPageCount, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
