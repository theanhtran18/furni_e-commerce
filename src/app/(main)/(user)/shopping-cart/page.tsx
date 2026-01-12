"use client";

import CartTable from "@/components/Cart-table";
import Banner from "@/components/ui/Banner";

const ShoppingCart = () => {
  return (
    <>
      <Banner title="My cart" />
      <CartTable />
    </>
  );
};

export default ShoppingCart;
