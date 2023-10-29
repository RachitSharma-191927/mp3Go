import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addCartItems } from "../../redux/usercart";
export default function CartSummary({ data }) {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const token = useSelector((state) => state.tokenData.token);

  const initPayment = async (datas) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY,
      amount: datas.amount,
      currency: datas.currency,
      name: "Your Cart",
      description: "Albums Payment",
      order_id: datas.id,
      handler: async (response) => {
        try {
          const verifyUrl = "https://mp3backend.onrender.com/payment/verify";
          const { data } = await axios.post(verifyUrl, response, {
            headers: {
              "x-access-token": token,
            },
          });
          console.log("Data after Verify", data);
          dispatch(addCartItems(data));
          Navigate("/profile");
        } catch (error) {}
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async (value) => {
    if (parseInt(value) === 0) {
      toast.error("Please add items to Cart");
      return;
    }
    try {
      const checoutUrl = "https://mp3backend.onrender.com/payment/checkout";

      var { data } = await axios.post(
        checoutUrl,
        {
          amount: value,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      initPayment(data.data);
    } catch (error) {
      toast.error("Error in Back-end");
      return;
    }
  };
  return (
    <div className="md:w-2/5 mx-2 xl:w-1/4 w-[95%] bg-gray-900 bg-opacity-10 dark:bg-[#303134] h-full">
      <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
        <div>
          <p className="text-4xl font-black leading-9">Summary</p>
          <div className="flex items-center justify-between pt-16">
            <p className="text-base leading-none ">Subtotal</p>
            <p className="text-base leading-none ">Rs. {data.cart_total}</p>
          </div>
          <div className="flex items-center justify-between pt-5">
            <p className="text-base leading-none ">Discount</p>
            <p className="text-base leading-none ">Rs. {data.discount}</p>
          </div>
          <div className="flex items-center justify-between pt-5">
            <p className="text-base leading-none ">Tax</p>
            <p className="text-base leading-none ">
              Rs {data.total * (5 / 100)}
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center pb-6 justify-between lg:pt-5 pt-2">
            <p className="text-2xl leading-normal ">Total</p>
            <p className="text-2xl font-bold leading-normal text-right ">
              Rs. {data.total + data.total * (5 / 100)}
            </p>
          </div>
          <button
            onClick={() => handlePayment(data.total)}
            className="text-base leading-none w-full py-5 bg-black  border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
