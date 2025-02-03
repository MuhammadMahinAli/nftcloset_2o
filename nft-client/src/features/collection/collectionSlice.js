import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 collection: [],
 
};

const collectionSlice = createSlice({
 name: 'collection',
 initialState,
 reducers: {
    // Define your reducers here
    addCollection: (state, action) => {
      state.collection.push(action.payload);
    },
    // ... other reducers
 },
 // If you're using RTK Query, you would define endpoints here
});

export const { addCollection } = collectionSlice.actions;

export default collectionSlice.reducer;