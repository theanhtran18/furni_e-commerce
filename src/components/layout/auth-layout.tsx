const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen overflow-hidden flex items-center justify-center bg-[#3b5d50] px-3 mt-[-50px]">
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-[400px] space-y-6">
      {children}
    </div>
  </div>
);

export default AuthLayout;
