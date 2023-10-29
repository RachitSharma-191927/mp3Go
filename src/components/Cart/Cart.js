import React, { useEffect } from "react";
import CartCard from "./CartCard";
import CartSummary from "./CartSummary";
import { useAxios } from "../../hooks/useAxios";
import { useSelector, useDispatch } from "react-redux";
import { addCartItems } from "../../redux/usercart";

// When 'add to cart' button is clicked, data is passed from Card.js to database and retreived from db here.
// On adding backend logic, we will write the complete code of adding, deleting and retrieving data
// Todo: See about adding setCartItem() into another arrow function
// Todo: Add scrollbar?

export default function Cart() {
  var { data: value, error } = useAxios("/user/cart", "GET");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!error) {
      dispatch(addCartItems(value));
    }
  }, [value, error, dispatch]);

  const data = useSelector((State) => State.userCart.userCart);

  return (
    <div className="bg-[#DEE4E799] dark:bg-[#202124] min-h-[90vh]">
      <div className="flex flex-col justify-start py-10">
        <h2 className="text-5xl font-black leading-10 pt-3 sm:ml-2 lg:ml-28">
          Mp3go Cart
        </h2>

        {/* Todo: Show div "Cart Empty" when cartItems is empty */}

        <div className="flex md:flex-row flex-col items-center justify-around md:items-start mt-10">
          {/* Cards */}
          <div className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 ">
            {/* {cartItems.map((item) => (
            <CartCard removeCartItem={removeCartItem} item={item}></CartCard>
          ))} */}
            {data
              ? Object.keys(data).length != 0
                ? data.items.map((card) => {
                    return <CartCard data={card} />;
                  })
                : null
              : null}
          </div>
          {/* Summary */}
          {data ? (
            // Object.keys(data).length != 0 ? (
            <CartSummary data={data} />
          ) : // ) : null
          null}
          {/* {data ? <CartSummary data={data} /> : null} */}
        </div>

        {/* Back link */}
      </div>
    </div>
  );
}
