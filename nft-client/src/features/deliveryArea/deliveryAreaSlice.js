import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 order: [],
 
};

const orderSlice = createSlice({
 name: 'order',
 initialState,
 reducers: {
    // Define your reducers here
    addOrder: (state, action) => {
      state.order.push(action.payload);
    },
    // ... other reducers
 },
 // If you're using RTK Query, you would define endpoints here
});

export const { addOrder } = orderSlice.actions;

export default orderSlice.reducer;