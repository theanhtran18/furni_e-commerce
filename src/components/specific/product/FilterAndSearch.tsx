import { useForm, SubmitHandler } from "react-hook-form";

type Input = {
  search: string;
};
const FilterAndSearchProduct = ({ onFilterChange }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();
  const onSubmit: SubmitHandler<Input> = (data) => onFilterChange(data.search);

  return (
    <div className="py-2 bg-white sticky top-[120px] z-50 flex justify-between items-center shadow-md  px-30">
      {/* Filter block */}
      <div className="flex items-center gap-4">
        <label className="font-semibold text-ms">Sort by Price</label>
        <select
          onChange={(e) => onFilterChange(e.target.value)}
          className="p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition w-[200px]"
          defaultValue=""
        >
          <option value="" disabled>
            Select
          </option>
          <option value="asc">Increase</option>
          <option value="desc">Decrease</option>
        </select>
      </div>

      {/* Search form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-1"
      >
        <div className="flex items-center space-x-3">
          <input
            {...register("search", { required: true })}
            placeholder="Tìm sản phẩm..."
            className="p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <button
            type="submit"
            className="p-1 px-5 bg-emerald-500 rounded-lg hover:text-white hover:bg-emerald-600 cursor-pointer  "
          >
            Search
          </button>
        </div>
        {errors.search && (
          <p className="text-red-500 text-sm ml-1">Không được để trống</p>
        )}
      </form>
    </div>
  );
};

export default FilterAndSearchProduct;
