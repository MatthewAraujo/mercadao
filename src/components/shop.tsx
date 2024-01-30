"use client"

import { useLoja } from "@/context/useLoja";
import { useState } from "react";

interface ShopProps {
  id: number;
  price: number;
}
export function Shop({ id, price, }: ShopProps) {
  const [addProduct, setAddProduct] = useState(0)
  const { handleAddToCart, cart } = useLoja()
  function handleAddProduct() {
    setAddProduct(addProduct + 1)
  }
  function handleRemoveProduct() {
    setAddProduct(addProduct - 1)
    if (addProduct === 0) {
      setAddProduct(0)
    }
  }
  return (
    <div className=" flex items-center justify-center gap-2 border rounded-md bg-[#E6E5E5]">
      <button
        className="border-transparent"
        onClick={handleRemoveProduct}
      >-</button>
      <span>{addProduct}</span>
      <button className="border-transparent " onClick={handleAddProduct}>+</button>
      <ShoppingCartIcon className="cursor-pointer" onClick={() => {
        if (addProduct >= 1) {
          handleAddToCart(id, addProduct, price)
          console.log(cart)
        }
      }} />

    </div>
  )
}


function ShoppingCartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}