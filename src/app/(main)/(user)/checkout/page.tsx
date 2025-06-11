"use client";

import { useState } from "react";
import Banner from "@/components/ui/Banner";
import BillingDetail from "@/components/specific/checkout/Billing-details";
import OrderSummary from "@/components/specific/checkout/Order-summary";

const CheckoutPage = () => {
  const [form, setForm] = useState({
    address: "",
    phone: "",
    note: "",
    paymentMethod: "COD",
  });

  return (
    <>
      <div>
        <Banner title="Checkout" />
        <div className="bg-[#eff2f1] ">
          <div className="grid grid-cols-2 gap-4 py-14 px-30 ">
            {/* Billing Details */}

            <BillingDetail form={form} setForm={setForm} />
            {/* Order Summary + Payment */}
            <OrderSummary form={form} setForm={setForm} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
