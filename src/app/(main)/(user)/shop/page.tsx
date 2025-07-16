"use client";

import ProductModal from "@/components/Product-modal";
import FilterAndSearchProduct from "@/components/specific/product/FilterAndSearch";
import ProductCard from "@/components/ui/Product-card";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Pagination from "@/components/ui/Pagination";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const handleNext = () => {
    router.push(`/shop?page=${page + 1}`);
  };

  const handlePrev = () => {
    router.push(`/shop?page=${Math.max(1, page - 1)}`);
  };

  const handleCurrent = (value: number) => {
    setCurrentPage(value);
    router.push(`/shop?page=${value}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/products?page=${page}&limit=3`
      );
      const data = await res.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setLoading(false);
    };

    fetchProducts();
  }, [page]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleFilterProducts = async (value: string) => {
    try {
      let sortProduct = [];
      if (value === "asc") {
        sortProduct = [...products].sort((a, b) => a.price - b.price);
      } else if (value === "desc") {
        sortProduct = [...products].sort((a, b) => b.price - a.price);
      } else if (value != "") {
        console.log(typeof value);
        sortProduct = [...products].filter((product) =>
          product.productName.toLowerCase().includes(value.toLowerCase())
        );
      } else {
        sortProduct = products;
      }
      setFilteredProducts(sortProduct);
      console.log(sortProduct);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <FilterAndSearchProduct onFilterChange={handleFilterProducts} />
        <div>
          <div className="bg-white w-full border-none  text-black p-30">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
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
          {/* Phân trang*/}
          <Pagination
            page={page}
            totalPages={totalPages}
            currentPage={currentPage}
            handleCurrent={handleCurrent}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        </div>
      </div>
    </>
  );
};

export default ShopPage;
