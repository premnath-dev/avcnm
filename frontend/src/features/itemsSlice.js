import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch items from the Flask backend
export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const response = await fetch('http://localhost:5000/api');
  return response.json();
});

// Async thunk to create a new item
export const createItem = createAsyncThunk('items/createItem', async (newItem) => {
  const response = await fetch('http://localhost:5000/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newItem),
  });
  return response.json();
});

// Items slice
const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.items.push(action.payload.item);
      });
  },
});

export default itemsSlice.reducer;
