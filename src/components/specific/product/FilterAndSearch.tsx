import { useState, useEffect } from "react";

interface FilterAndSearchProductProps {
  onFilterChange: (filters: {
    search?: string;
    category?: string;
    sortBy?: string;
  }) => void;
}


const FilterAndSearchProduct = ({ onFilterChange }: FilterAndSearchProductProps) => {
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Initial filter setup - set "All" category on component mount
  useEffect(() => {
    onFilterChange({ category: "All" });
  }, [onFilterChange]);

  // Debounced search effect
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        onFilterChange({ search: searchTerm });
      } else if (searchTerm === "") {
        // Clear search when input is empty
        onFilterChange({ search: "" });
      }
    }, 500); // 500ms delay

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, onFilterChange]);

  const handleSearchInputChange = (value: string) => {
    setSearchTerm(value);
  };

  const handlePriceChange = (value: string) => {
    setSelectedPrice(value);
    onFilterChange({ sortBy: value });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onFilterChange({ category: category === "All" ? "" : category });
  };

  const categories = [
    "All",
    "Sofa",
    "Desk",
    "Office Chair",
    "Cabinet",
    "Bed",
    "Dining Table"
  ];

  return (
    <div className="space-y-6">
      {/* Search form */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Search</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => handleSearchInputChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        {searchTerm && (
          <div className="mt-2 text-xs text-gray-500">
            Searching for &ldquo;{searchTerm}&rdquo;...
          </div>
        )}
      </div>

      {/* Danh mục */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Sắp xếp theo giá */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Sort by Price</h3>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer group">
            <input
              type="radio"
              name="price"
              value=""
              checked={selectedPrice === ""}
              onChange={(e) => handlePriceChange(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
              Default
            </span>
          </label>
          <label className="flex items-center cursor-pointer group">
            <input
              type="radio"
              name="price"
              value="asc"
              checked={selectedPrice === "asc"}
              onChange={(e) => handlePriceChange(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
              Low to High
            </span>
          </label>
          <label className="flex items-center cursor-pointer group">
            <input
              type="radio"
              name="price"
              value="desc"
              checked={selectedPrice === "desc"}
              onChange={(e) => handlePriceChange(e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
              High to Low
            </span>
          </label>
        </div>
      </div>

      {/* Reset filters */}
      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={() => {
            setSelectedPrice("");
            setSelectedCategory("");
            setSearchTerm("");
            onFilterChange({ search: "", category: "", sortBy: "" });
          }}
          className="w-full py-2 px-4 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterAndSearchProduct;
