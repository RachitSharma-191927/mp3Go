import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
};

export const userToken = createSlice({
  name: "userToken",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      localStorage.setItem("token","")
      state.token = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToken, removeToken } = userToken.actions;

export default userToken.reducer;
