"use client";
const Pagination = ({
  page,
  totalPages,
  currentPage,
  handleCurrent,
  handleNext,
  handlePrev,
}) => {
  return (
    <div className="bg-white flex justify-center items-center space-x-2 py-4">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className={`px-4 py-1 rounded-lg shadow transition 
      ${
        page === 1
          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
          : "bg-emerald-500 text-white hover:bg-emerald-600"
      }`}
      >
        Prev
      </button>

      <div className="flex space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handleCurrent(i + 1)}
            className={`px-3 py-1 rounded-lg shadow transition 
          ${
            currentPage === i + 1
              ? "bg-emerald-600 text-white"
              : "bg-gray-100 hover:bg-emerald-100 text-gray-800"
          }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className={`px-4 py-1 rounded-lg shadow transition 
      ${
        page === totalPages
          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
          : "bg-emerald-500 text-white hover:bg-emerald-600"
      }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
