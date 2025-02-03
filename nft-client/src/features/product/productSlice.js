import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 product: [],
 
};

const productSlice = createSlice({
 name: 'product',
 initialState,
 reducers: {
    // Define your reducers here
    addProduct: (state, action) => {
      state.product.push(action.payload);
    },
    // ... other reducers
 },
 // If you're using RTK Query, you would define endpoints here
});

export const { addproduct } = productSlice.actions;

export default productSlice.reducer;