"use client";

import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import AuthLayout from "@/components/layout/Auth-layout";
import AuthHeader from "@/components/ui/Auth-header";
import GoogleAuthButton from "@/components/button/Google-button";
import Divider from "@/components/ui/Divider";
import LoginFormFields from "@/components/form/Login-form-field";
import axiosInstance from "lib/axiosInstance";
import { setAuth } from "lib/auth";

const LoginPage = () => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { data: userInfo } = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }
      );

      const user = await axiosInstance.post("/auth/google", {
        email: userInfo.email,
        givenName: userInfo.given_name,
        familyName: userInfo.family_name,
        avatar: userInfo.picture,
      });
      setAuth(user.data.user);
      if (user.data.user.role === "user") {
        window.location.href = "/";
      } else {
        window.location.href = "/admin";
      }
    },
  });

  return (
    <AuthLayout>
      <AuthHeader title="Welcome Back" subtitle="Login to your account" />
      <GoogleAuthButton onClick={login} label="Login with Google" />
      <Divider />
      <LoginFormFields check={false} />
      <div className="text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <a
          href="/register"
          className="text-[#3b5d50] font-semibold hover:underline"
        >
          Sign up
        </a>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
