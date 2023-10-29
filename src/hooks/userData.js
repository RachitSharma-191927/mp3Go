import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useWishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.tokenData.token);

  async function addToWishlist(id) {
    try {
      let res = await axios.post("https://mp3backend.onrender.com/user/data", {
        headers: {
          "x-access-token": token,
        },
      });
      navigate("/wishlist");
    } catch (err) {
      if (err.response.status === 409) {
        toast.warning(err.response.data.message);
      } else if (err.response.status === 401) {
        toast.error(err.response.data.message);
      }
    }
  }

  return { addToWishlist };
};
