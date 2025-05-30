"use client";

import CartTable from "@/components/cart-table";
import Banner from "@/components/ui/banner";

const ShoppingCart = () => {
  return (
    <>
      <Banner title="My cart" />
      <CartTable />
    </>
  );
};

export default ShoppingCart;
