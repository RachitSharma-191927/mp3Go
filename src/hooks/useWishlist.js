import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addWishlistItems } from "../redux/userWishlit";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useWishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.tokenData.token);

  async function addToWishlist(id, action) {
    try {
      if (action === "add") {
        let res = await axios.post(
          "https://mp3backend.onrender.com/user/wishlist",
          {
            albumId: id,
          },
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        dispatch(addWishlistItems(res.data));
        toast.success("Item successfully added to wishlist");
        navigate("/wishlist");
      } else if (action === "rem") {
        const res = await axios.delete(
          "https://mp3backend.onrender.com/user/wishlist",
          {
            headers: {
              "x-access-token": token,
            },
            data: {
              albumId: id,
            },
          }
        );
        dispatch(addWishlistItems(res.data));
      }
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/login");
        toast.warning(err.response.data.message);
      } else {
        toast.error(err.response.data.message);
      }
    }
  }

  return { addToWishlist };
};
