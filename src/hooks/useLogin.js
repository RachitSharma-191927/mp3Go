import { useState } from "react";
import axiosAPI from "../axios";
import { useSelector, useDispatch } from "react-redux";
import { addToken } from "../redux/token";
import { addCartItems } from "../redux/usercart";
import { addWishlistItems } from "../redux/userWishlit";
import { toast } from "react-toastify";

export const useLogin = () => {
  //   const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const tokenValue = useSelector((state) => state.tokenData.token);
  const dispatch = useDispatch();
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": tokenValue,
  };

  async function handleLogin(email, password) {
    const user = {
      email: email,
      password: password,
    };
    var res;
    try {
      res = await axiosAPI.post("/login", user, { headers });
      localStorage.setItem("token", res.data.token);
      dispatch(addToken(res.data.token));
      dispatch(addCartItems(res.data.user.cart));
      dispatch(addWishlistItems(res.data.user.wishlist.items));
    } catch (error) {
      toast.error(error.response.data.message);
      setErrorMessage(error);
    }

    return res;
  }

  return { handleLogin };
};
