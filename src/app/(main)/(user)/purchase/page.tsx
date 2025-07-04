"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSelectedItems } from "store/slices/cart-slice";
import OrderStatusTabs from "@/components/specific/purchase/OrderStatusTabs";
import { getUser } from "lib/auth";
import { toast } from "sonner";
import OrderCard from "@/components/specific/purchase/OrderCard";

const PurchasePage = () => {
  const user = getUser();
  const dispatch = useDispatch();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [filterOrders, setFilterOrders] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");

  const handleBuyBack = (order) => {
    dispatch(setSelectedItems([order]));
    router.push("/checkout");
  };
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    console.log("Tab được chọn:", tab);
    // Gọi API hoặc filter đơn hàng ở đây nếu cần
  };
  const handleCancelOrder = async (order) => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE + `/orders/${order._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status: "cancelled" }),
      }
    );

    if (res.ok) {
      const data = await res.json();
      toast.success("Cancelled Order!");
      getAllOrder();
    } else {
      toast.error("Failed to cancel order.");
    }
  };

  const getAllOrder = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + "/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.ok) {
        //toast.success("Order placed successfully!");
        const data = await res.json();
        setOrders(data.orders);
      } else {
        toast.error("Failed to place order.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while placing order.");
    }
  };

  useEffect(() => {
    if (user?._id) {
      getAllOrder();
    }
  }, [user?._id]);

  useEffect(() => {
    if (selectedTab === "All") {
      setFilterOrders(orders);
    } else {
      setFilterOrders(
        orders.filter(
          (order) => order.status.toLowerCase() === selectedTab.toLowerCase()
        )
      );
    }
  }, [orders, selectedTab]);

  return (
    <>
      <OrderStatusTabs onTabChange={handleTabChange} />
      <OrderCard
        filterOrders={filterOrders}
        handleBuyBack={handleBuyBack}
        handleCancelOrder={handleCancelOrder}
      />
    </>
  );
};

export default PurchasePage;
