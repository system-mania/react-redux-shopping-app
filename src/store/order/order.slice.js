import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://656847229927836bd9746e8d.mockapi.io/orders?search=${userId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Error receiving order');
    }
  }
);

const initialState = {
  order: [],
  isLoading: false,
  error: '',
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
