"use client";

import ProductModal from "@/components/Product-modal";
import Banner from "@/components/ui/Banner";
import ProductCard from "@/components/ui/Product-card";
import { useState, useEffect } from "react";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div>
        <Banner title="Shop" />
        <div>
          <div className="bg-white w-full border-none  text-black p-30">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onClick={() => setSelectedProduct(product)}
                  />
                ))
              ) : (
                <div>Chưa có sản phẩm nào!</div>
              )}
            </div>
          </div>
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        </div>
      </div>
    </>
  );
};

export default ShopPage;
