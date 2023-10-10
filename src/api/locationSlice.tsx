import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface ReverseGeocodeState {
  locationName: string | null;
  error: string | null;
}

export const reverseGeocodeLocation = createAsyncThunk<string, { latitude: number; longitude: number }>(
  'reverseGeocode/reverseGeocodeLocation',
  async (location, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.latitude}&lon=${location.longitude}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }

      const data = await response.json();

      return data.display_name;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: ReverseGeocodeState = {
  locationName: null,
  error: null,
};

const reverseGeocodeSlice = createSlice({
  name: 'reverseGeocode',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(reverseGeocodeLocation.fulfilled, (state, action) => {
        state.locationName = action.payload;
        state.error = null;
      })
      .addCase(reverseGeocodeLocation.rejected.type, (state, action) => {
        state.locationName = null;
        state.error = action.payload as string;
      })
  },  
});

export default reverseGeocodeSlice.reducer;
