"use client"
import React from "react";
import { useCartStore } from "@/store/cart-store";
import Link from "next/link";
import Image from 'next/image'
import { ShoppingCart, TextAlignJustifyEnd } from "lucide-react";

const DesktopNav = () => {
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <nav className=" flex sticky transition-all h-[12vh] w-full top-0 z-50 bg-white shadow text-black">
      <div className="container mx-auto hidden lg:flex items-center h-full justify-between px-4">
        <Link href="/" className="hover:text-blue-600">
          <Image src="/image/logo.png" width={80} height={80} alt="logo " />
        </Link>

        <div className="hidden md:flex space-x-6 hover:text-[#7715E1] transition-all duration-300">
          <Link href="/">Home</Link>
          <Link href="/Products" className="hover:text-blue-600">
            Products
          </Link>
          <Link href="/Checkout" className="hover:text-blue-600">
            Checkout
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/Checkout" className="relative">
            <ShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-center text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
        <TextAlignJustifyEnd className="lg:hidden"/>
    </nav>
  );
};

export default DesktopNav;
