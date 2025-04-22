"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LoginFormFields = ({ check }: { check: boolean }) => {
  const [formData, setFormData] = useState({
    givenName: "",
    familyName: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      type AuthPayload = {
        email: string;
        password: string;
        givenName?: string;
        familyName?: string;
      };

      if (!validateEmail(formData.email)) {
        toast.error("Email is not in correct format!");
        return;
      }
      if (!formData.password.trim()) {
        toast.error("Please enter password!");
        return;
      }

      const payload: AuthPayload = {
        email: formData.email,
        password: formData.password,
      };

      if (check && formData.familyName.trim()) {
        payload.givenName = formData.givenName;
        payload.familyName = formData.familyName;
      } else if (check && !formData.familyName.trim()) {
        toast.error("Please enter name!");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/${check ? "register" : "login"}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (res.status === 200) {
        console.log("✅ Success:", data);
      } else {
        console.log("Error:", payload);
        toast.error(data.message);
        return;
      }

      if (check) {
        localStorage.setItem("email", formData.email);
        router.push("/verifycode");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("❌ Error:", err);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {check && (
        <>
          <div className="grid grid-cols-2 gap-2">
            <label className="block text-gray-700 font-medium mb-1">
              First Name
            </label>
            <label className="block text-gray-700 font-medium mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="givenName"
              value={formData.givenName}
              onChange={handleChange}
              placeholder="John"
              className="w-full px-4 py-2 rounded-xl border mt-[-10px] text-[#171e1c] border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3b5d50] transition-all"
            />

            <input
              type="text"
              name="familyName"
              value={formData.familyName}
              onChange={handleChange}
              placeholder="Doe"
              className="w-full px-4 py-2 rounded-xl border mt-[-10px] text-[#171e1c] border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3b5d50] transition-all"
            />
          </div>
        </>
      )}

      <div>
        <label className="block text-gray-700 font-medium mb-1 mt-[-10px]">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="w-full px-4 py-2 rounded-xl text-[#171e1c] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3b5d50] transition-all"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1 mt-[-10px]">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          className="w-full px-4 py-2 text-[#171e1c] rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#171e1c] transition-all"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#3b5d50] hover:bg-[#324d44] text-white py-2 rounded-xl font-semibold transition-all"
      >
        {check ? "Register" : "Login"}
      </button>
    </form>
  );
};

export default LoginFormFields;
