import React from "react";
import { useAxios } from "../../hooks/useAxios";
import OrderCard from "./ordercard";
import Profile from "./Profile";

export default function UserProfile() {
  const { data: userData, error } = useAxios("/user/data", "GET");
  //   const [uData, setuData] = useState(userData?);
  return (
    <div className="bg-[#DEE4E799] dark:bg-[#202124] min-h-[90vh] p-5">
      <div className="flex flex-col sm:flex-row justify-start w-full">
        <div className="flex">
          {userData ? <Profile data={userData} /> : null}
        </div>
        <div className="flex-1 flex flex-col justify-start md:pl-5 py-10">
          <h2 className="text-3xl text-center sm:text-3xl sm:text-start md:text-5xl w-full font-black leading-10 pt-3 sm:ml-2 md:pl-10">
            {userData ? "Your Orders" : null}
          </h2>

          {/* Todo: Show div "Cart Empty" when cartItems is empty */}

          <div className="flex md:flex-row flex-col justify-around items-start mt-10">
            {/* Cards */}
            <div className="w-full md:pl-10 pl-4 pr-0 md:pr-4 md:py-12 py-8 ">
              {/* {cartItems.map((item) => (
        <CartCard removeCartItem={removeCartItem} item={item}></CartCard>
      ))} */}
              {userData
                ? userData.orders.map((card) => {
                    return <OrderCard data={card} />;
                  })
                : null}
            </div>

            {/* Summary */}
          </div>
        </div>
      </div>
    </div>
  );
}
