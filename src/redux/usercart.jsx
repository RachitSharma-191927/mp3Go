import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userCart: {},
};

export const userCart = createSlice({
  name: "userCart",
  initialState,
  reducers: {
    addCartItems: (state, action) => {
      state.userCart = action.payload;
    },
    removeCartItems: (state) => {
      state.userCart = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCartItems, removeCartItems } = userCart.actions;

export default userCart.reducer;
