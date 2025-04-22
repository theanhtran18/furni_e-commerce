const UlFooter = ({ items }) => {
  return (
    <ul className="space-y-4">
      {items.map((text, index) => (
        <li key={index} className="hover:text-[#629b8add] cursor-pointer">
          {text}
        </li>
      ))}
    </ul>
  );
};

export default UlFooter;
