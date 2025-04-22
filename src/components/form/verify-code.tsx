import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "lib/axiosInstance";

const VerifyCodeForm = () => {
  const [code, setCode] = useState("");
  const router = useRouter();
  const email = localStorage.getItem("email");

  const handleRegister = async () => {
    const res = await axiosInstance.post("/verifycode", {
      email,
      code,
    });

    if (res.status === 200) {
      console.log("Thành công:", res.data);
      localStorage.removeItem("email");
      router.push("/login");
    } else {
      console.error("Lỗi xác thực:", res.data);
      router.push("/");
    }
  };
  return (
    <>
      <div>
        <input
          type="text"
          name="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full text-center px-4 py-3 rounded-xl border text-[#171e1c] border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3b5d50] transition-all"
        />
      </div>
      <div className="mt-10 grid grid-cols-2 justify-between gap-4">
        <button
          className="border-2 rounded-[10px] p-2 border-[#3b5d50] text-[#3b5d50] cursor-pointer"
          onClick={() => router.push("/")}
        >
          Quay lại
        </button>
        <button
          onClick={handleRegister}
          className="bg-[#3b5d50] rounded-[10px] p-2 cursor-pointer text-white"
        >
          Xác nhận
        </button>
      </div>
    </>
  );
};

export default VerifyCodeForm;
