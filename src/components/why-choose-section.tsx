import FiRrCalendarShiftSwap from "./flations/fi-rr-calendar-shift-swap";
import FiRrGroceryBasket from "./flations/fi-rr-grocery-basket";
import FiRrLifeRing from "./flations/fi-rr-life-ring";
import FiRrTruckSide from "./flations/fi-rr-truck-side";
import Feature from "./ui/Feature";

const WhyChooseSection = () => {
  return (
    <>
      <div className="flex gap-10 p-30">
        <div className=" text-black">
          <h1 className="text-3xl font-bold mb-4 font-poppins">
            Why Choose Us
          </h1>
          <p className="text-gray-600 mb-10 text-[15px]">
            Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
            velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
          </p>
          <div className="grid grid-cols-2 gap-10 ">
            <Feature
              icon={<FiRrTruckSide />}
              title="Fast & Free Shipping"
              description="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate."
            />
            <Feature
              icon={<FiRrGroceryBasket />}
              title="Easy to Shop"
              description="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate."
            />
            <Feature
              icon={<FiRrLifeRing />}
              title="24/7 Support"
              description="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate."
            />
            <Feature
              icon={<FiRrCalendarShiftSwap />}
              title="Hassle Free Returns"
              description="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate."
            />
          </div>
        </div>

        <div>
          <img className="rounded-3xl" src="./why-choose-us-img.jpg" alt="" />
        </div>
      </div>
    </>
  );
};

export default WhyChooseSection;
