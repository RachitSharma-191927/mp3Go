import { useEffect, useState } from "react";
import axiosAPI from "../axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeToken } from "../redux/token";

export const useAxios = (url, method, config = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.tokenData.token);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": token,
  };

  useEffect(() => {
    const getAPIData = async () => {
      try {
        let res;

        if (method === "GET") {
          res = await axiosAPI.get(url, { headers });
        } else {
          res = await axiosAPI.post(url, config, { headers });
        }

        setData(res.data);
      } catch (error) {
        if (error.response.status === 404) {
          navigate("/searchError");
          return;
        } else if (
          error.response.status === 401 &&
          (location.pathname == "/cart" ||
            location.pathname == "/wishlist" ||
            location.pathname == "/Profile")
        ) {
          toast.error("Please Login First");
          dispatch(removeToken());
          navigate("/login");
        }
        setError(error);
        console.log("Error Occured");
      }
    };

    // unsubscribe and unmount
    getAPIData();
  }, [url, method]);

  // config in dependency will give infinte loop bcoz it is not a primitive data type
  // solution: see in project => useCallback and another
  return { data, error };
};
