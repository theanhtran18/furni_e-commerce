const Banner = ({ title }) => {
  return (
    <div className="relative bg-[#3b5d50] py-20 pl-30 overflow-hidden">
      {/* Ảnh nền mờ */}
      <img
        src="/couch.png"
        alt="couch background"
        className="absolute top-0 right-0 w-full h-full object-cover opacity-15 pointer-events-none"
      />

      {/* Nội dung tiêu đề */}
      <h1 className="relative z-10 font-bold text-white text-4xl">{title}</h1>
    </div>
  );
};

export default Banner;
