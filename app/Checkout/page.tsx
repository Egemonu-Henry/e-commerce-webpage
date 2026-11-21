"use client";
import { Button } from "@/component/ui/button";
import { useCartStore } from "@/store/cart-store";
import { toast } from "react-toastify";
import React from "react";

const page = () => {

  const notify = () => {
  toast.success("Payment Successfull! Thanks for using Shoppaholic!!");
  };

  const { items, removeItem, addItem, clearCart } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (total === 0 || items.length === 0) {
    return (
      <div>
        <h1>Your Cart is empty</h1>
      </div>
    );
  }
  return (
    <div className=" mx-auto px-4 py-8 container ">
      <h1 className="text-center text-3xl font-bold mb-8 text-black">Checkout</h1> 
      <div className="flex items-center justify-center">
        <div className=" bg-amber-400 p-4 w-full max-w-[70% ] mb-6 mx-auto shadow-2xl bg-gray-100 rounded-2xl">
          {/* header */}
          <div>
            <h4 className="text-xl font-extrabold mb-4 text-center">Order Summary</h4>
          </div>
          {/* content */}
          <div>
            <ul className="space-y-4 px-2">
              {items.map((item, key) => {
                return (
                  <li key={key} className="flex flex-col gap-2 border-b pb-2">
                    <div className="flex justify-between ">
                      <span className="font-medium "> {item.name} </span>
                      <span className= 'font-semibold'>
                        {" "}
                        &#x20A6;
                        {((item.price * item.quantity) / 100).toFixed(2)}{" "}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => removeItem(item.id)}
                        className="bg-gray-500  active:bg-red-700 border-none focus:outline-none "
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button onClick={()=> addItem({...item, quantity: 1})}
                       className='bg-gray-500  rounded-2xl'
                       >
                        +
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
            {/* total amount */}
            <div className='p-4 font-medium'>
                Total: &#x20A6;{(total / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
      <form action="submit" className="max-w-md mx-auto items-center flex justify-center gap-4">
        <Button onClick={()=>clearCart()} className="w-full bg-red-700">
           Clear Cart
        </Button>

        <Button className="w-full bg-green-600" onClick={notify}>
            Proceed To Payment
        </Button>
      </form>
    </div>
  );
};

export default page;
