import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (id, thuckAPI) => {
    try {
      const response = await axios.get(
        `http://fakestoreapi.com/products/${id}`
      );
      return response.data;
    } catch (error) {
      return thuckAPI.rejectWithValue('Error loading product');
    }
  }
);

const initialState = {
  product: {},
  isLoading: false,
  error: '',
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
