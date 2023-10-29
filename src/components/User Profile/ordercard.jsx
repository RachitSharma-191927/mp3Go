import React from "react";

export default function OrderCard({ data }) {
  return (
    <div>
      <div className="md:flex mt-2 py-8 border-t border-gray-400 dark:border-[#3c4043]">
        <div className="w-52 md:w-1/3 lg:w-1/5 mb-2 md:mb-0 ">
          <img
            src={data.checkoutOrder.items[0].product.img}
            alt="Order_Image"
            className="w-full rounded-sm  sm:pl-3 h-52 sm:h-50 md:h-40 object-cover object-center"
          />
        </div>
        <div className="flex flex-col justify-end md:pl-3 md:w-3/4">
          <div className="py-2 flex justify-between text-sm leading-3">
            <p className="font-semibold">Total Items </p>
            <p>{data.checkoutOrder.items.length}</p>
          </div>
          <div className="py-2 flex justify-between text-sm leading-3">
            <p className="font-semibold">Placed On </p>
            <p>{data.date.split("T")[0]}</p>
          </div>
          <div className="py-2 flex justify-between text-sm leading-3">
            <p className="font-semibold">Total Cost</p>
            <p> {data.checkoutOrder.order_total}</p>
          </div>
          <div className="py-2 flex justify-between text-sm leading-3">
            <p className="font-semibold">Discount </p>
            <p>{data.checkoutOrder.discount}</p>
          </div>
          <div className="py-2 flex justify-between text-sm leading-3 text-red-500 ">
            <p className="font-semibold">Final Cost </p>
            <p className="font-semibold">Rs. {data.checkoutOrder.total}</p>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
