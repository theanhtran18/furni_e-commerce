const Feature = ({ icon, title, description }) => {
  return (
    <div className="space-y-2">
      <div>{icon}</div>
      <h2 className="font-roboto mt-4">{title}</h2>
      <p className="text-gray-600 text-[15px]">{description}</p>
    </div>
  );
};

export default Feature;
