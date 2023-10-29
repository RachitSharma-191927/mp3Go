import { configureStore } from "@reduxjs/toolkit";
import userTokenReducer from "./token";
import userCartReducer from "./usercart";
import userWishlistReducer from "./userWishlit";
export const store = configureStore({
  reducer: {
    tokenData: userTokenReducer,
    userCart: userCartReducer,
    userWishlist: userWishlistReducer,
  },
});
