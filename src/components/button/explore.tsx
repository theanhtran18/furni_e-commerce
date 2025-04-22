interface ExploreButtonProps {
  bg?: string;
  text?: string;
  border?: string;
  textColor?: string;
}

const ExploreButton = ({
  bg = "bg-[#0f1312]",
  text = "Explore",
  border = "",
  textColor = "text-white",
}: ExploreButtonProps) => {
  return (
    <button
      className={`rounded-[30px] px-8 py-3 text-[18px] ${textColor} font-bold border-2 ${bg} ${border} cursor-pointer`}
    >
      {text}
    </button>
  );
};

export default ExploreButton;
