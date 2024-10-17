import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiAuthenticated from '../api/api';

export const getPets = createAsyncThunk('pet/pets', async (petId = null, {rejectWithValue}) => {
  try {
    const endpoint = petId ? `/Mascotas/${petId}` : '/Mascotas';
    const response = await apiAuthenticated.get(endpoint);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const petSlice = createSlice({
  name: 'pet/pets',
  initialState : {
    petsAvailable: [],
    selectedPet: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPets.fulfilled, (state, action) => {
        state.loading = false;

        if (Array.isArray(action.payload)) {
          state.petsAvailable = action.payload;
          state.selectedPet = null;
        } else {
          state.selectedPet = action.payload;
          state.petsAvailable = [];
        }
      })
      .addCase(getPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default petSlice.reducer;

