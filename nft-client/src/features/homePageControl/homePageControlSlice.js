import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 homePageControl: [],
 
};

const homePageControlSlice = createSlice({
 name: 'homePageControl',
 initialState,
 reducers: {
    // Define your reducers here
    addHomePageControl: (state, action) => {
      state.homePageControl.push(action.payload);
    },
    // ... other reducers
 },
 // If you're using RTK Query, you would define endpoints here
});

export const { addHomePageControl } = homePageControlSlice.actions;

export default homePageControlSlice.reducer;