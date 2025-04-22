const AuthHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <>
    <h2 className="text-3xl font-bold text-[#3b5d50] text-center font-poppins">
      {title}
    </h2>
    <p className="text-gray-600 text-center mt-[-10px]">{subtitle}</p>
  </>
);

export default AuthHeader;
