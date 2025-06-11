import ExploreButton from "../button/Explore";

const HeroContainer = () => {
  return (
    <div className="bg-[#3b5d50] w-full flex pb-0 p-30">
      <div>
        <h1 className="text-5xl font-bold w-4/5 mb-15 text-white">
          Modern Interior Design Studio
        </h1>
        <p className="text-[#8daea8] w-3/5 mb-10 ">
          Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit.
          Aliquam vulputate velit imperdiet dolor tempor tristique.
        </p>
        <div className="flex gap-4">
          <ExploreButton
            bg="bg-[#f9bf29]"
            text="Shop Now"
            border="border-none"
            textColor="text-[#191813]"
          />

          <ExploreButton bg="" border="border-[#8daea8]" />
        </div>
      </div>
      <div className="relative inline-block">
        <img src="./couch.png" alt="couch" className="relative z-10" />
        <img
          src="./dots-light.svg"
          alt="dots"
          className="absolute top-0 right-0 -z-0"
        />
      </div>
    </div>
  );
};

export default HeroContainer;
