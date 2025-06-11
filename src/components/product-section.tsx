"use client";

import { useEffect, useState } from "react";
import ExploreButton from "./button/Explore";
import ProductCard from "./ui/Product-card";

const ProductSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/product`);
        const data = await res.json();
        setProducts(data.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white w-full border-none grid grid-cols-4 gap-4 text-black p-30">
      <div>
        <h1 className="font-medium text-3xl">
          Crafted with excellent material.
        </h1>
        <p className="text-[#5a6461] my-7">
          Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit.
          Aliquam vulputate velit imperdiet dolor tempor tristique.
        </p>
        <ExploreButton />
      </div>

      <div className="col-span-3 flex gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
