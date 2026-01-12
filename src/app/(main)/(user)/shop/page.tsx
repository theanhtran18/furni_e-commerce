"use client";

import ProductModal from "@/components/Product-modal";
import FilterAndSearchProduct from "@/components/specific/product/FilterAndSearch";
import ProductCard from "@/components/ui/Product-card";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Pagination from "@/components/ui/Pagination";

interface Product {
  _id: string;
  productName: string;
  price: number;
  category?: string;
}

interface FilterOptions {
  search?: string;
  category?: string;
  sortBy?: string;
}

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({ category: "All" });

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
    router.push(`/shop?page=${value}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      
      // Cập nhật currentPage khi page thay đổi
      setCurrentPage(page);
      
      // Tạo promise cho việc fetch data và delay tối thiểu
      const fetchPromise = fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/products?page=${page}&limit=4`
      ).then(res => res.json());
      
      const minDelayPromise = new Promise(resolve => setTimeout(resolve, 800));
      
      try {
        // Chờ cả fetch data và delay tối thiểu hoàn thành
        const [data] = await Promise.all([fetchPromise, minDelayPromise]);
        
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const handleFilterProducts = useCallback(async (filters: FilterOptions) => {
    try {
      // Update active filters state
      setActiveFilters(filters);

      let sortProduct: Product[] = [...products];

      // Apply search filter
      if (filters.search && filters.search.trim() !== "") {
        sortProduct = sortProduct.filter((product) =>
          product.productName.toLowerCase().includes(filters.search!.toLowerCase())
        );
      }

      // Apply category filter (skip if "All" is selected)
      if (filters.category && filters.category.trim() !== "" && filters.category !== "All") {
        sortProduct = sortProduct.filter((product) =>
          product.category?.toLowerCase() === filters.category!.toLowerCase()
        );
      }

      // Apply price sorting
      if (filters.sortBy === "asc") {
        sortProduct = sortProduct.sort((a, b) => a.price - b.price);
      } else if (filters.sortBy === "desc") {
        sortProduct = sortProduct.sort((a, b) => b.price - a.price);
      }

      setFilteredProducts(sortProduct);
      console.log("Filtered products:", sortProduct);
    } catch (error) {
      console.log("Filter error:", error);
    }
  }, [products]);

  useEffect(() => {
    // Mặc định hiển thị tất cả sản phẩm khi load (filter = "All")
    if (products.length > 0) {
      handleFilterProducts(activeFilters);
    }
  }, [products, activeFilters, handleFilterProducts]);
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar - Filter và Search */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Product filter
                </h2>
                <FilterAndSearchProduct onFilterChange={handleFilterProducts} />
              </div>
            </div>

            {/* Main Content - Danh sách sản phẩm */}
            <div className="lg:w-3/4">
              {loading ? (
                <div className="transition-opacity duration-300 ease-in-out">
                  <ProductSkeletons />
                </div>
              ) : (
                <div className="transition-opacity duration-300 ease-in-out animate-fade-in">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                          <ProductCard
                            key={product._id}
                            product={product}
                            onClick={() => setSelectedProduct(product)}
                          />
                        ))
                      ) : (
                        <div className="col-span-full text-center py-12">
                          <div className="text-gray-500 text-lg">
                            Chưa có sản phẩm nào!
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Pagination */}
              <div className="mt-6">
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
          </div>
        </div>

        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    </>
  );
};

export default ShopPage;


const ProductSkeletons = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            {/* Hình ảnh sản phẩm skeleton */}
            <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
            
            {/* Tên sản phẩm skeleton */}
            <div className="space-y-2 mb-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            
            {/* Giá sản phẩm skeleton */}
            <div className="mb-4">
              <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            </div>
            
            {/* Button skeleton */}
            <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
