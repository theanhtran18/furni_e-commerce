import FiBrandsFacebook from "./flations/fi-brands-facebook";
import FiBrandsInstagram from "./flations/fi-brands-instagram";
import FiBrandsLinkedin from "./flations/fi-brands-linkedin";
import FiBrandsTwitter from "./flations/fi-brands-twitter";
import UlFooter from "./ui/ul-footer";

const Footer = () => {
  return (
    <footer className="bg-white p-30 text-gray-700 border-none">
      <h1 className="text-[#335045] font-bold text-3xl mb-6">Furni.</h1>
      <div className="grid grid-cols-6 space-x-10 text-[14px] tracking-wide">
        <div className="col-span-2 leading-loose">
          <p>
            Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis
            nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate
            velit imperdiet dolor tempor tristique. Pellentesque habitant
          </p>
          <div className=" flex gap-5 mt-10 text-2xl text-[#dce5e4] ">
            <FiBrandsFacebook className="text-[#335045] cursor-pointer hover:text-[#497162]" />
            <FiBrandsInstagram className="text-[#335045] cursor-pointer hover:text-[#497162]" />
            <FiBrandsTwitter className="text-[#335045] cursor-pointer hover:text-[#497162]" />
            <FiBrandsLinkedin className="text-[#335045] cursor-pointer hover:text-[#497162]" />
          </div>
        </div>
        <UlFooter items={["About us", "Services", "Blog", "Contact us"]} />
        <UlFooter items={["Support", "Knowledge base", "Live chat"]} />
        <UlFooter
          items={["Jobs", "Our team", "Leadership", "Privacy Policy"]}
        />
        <UlFooter items={["Nordic Chair", "Kruzo Aero", "Ergonomic chair"]} />
      </div>
      <div className="border border-[#d4dfdf] mt-20 mb-8"></div>
      <div className="flex justify-between text-sm text-[#5e5f5f]">
        <div className="max-w-1/2">
          Copyright ©2025. All Rights Reserved. — Designed with love by
          Untree.co Distributed By ThemeWagon
        </div>
        <div className="space-x-6">
          <button className="cursor-pointer hover:text-[#629b8add]">
            Terms & Conditions
          </button>
          <button className="cursor-pointer hover:text-[#629b8add]">
            Privacy Policy
          </button>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
