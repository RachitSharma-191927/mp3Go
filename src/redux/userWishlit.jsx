import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userWishlist: [],
};

export const userWishlist = createSlice({
  name: "userWishlist",
  initialState,
  reducers: {
    addWishlistItems: (state, action) => {
      state.userWishlist = action.payload;
    },
    removeWishlistItems: (state) => {
      state.userWishlist = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { addWishlistItems, removeWishlistItems } = userWishlist.actions;

export default userWishlist.reducer;
