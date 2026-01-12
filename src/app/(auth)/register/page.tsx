"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import AuthLayout from "@/components/layout/Auth-layout";
import AuthHeader from "@/components/ui/Auth-header";
import GoogleAuthButton from "@/components/button/Google-button";
import Divider from "@/components/ui/Divider";
import LoginFormFields from "@/components/form/Login-form-field";

const RegisterPage = () => {
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { data: userInfo } = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }
      );

      await axios.post(process.env.NEXT_PUBLIC_API_BASE + "/auth/google", {
        email: userInfo.email,
        givenName: userInfo.given_name,
        familyName: userInfo.family_name,
        avatar: userInfo.picture,
      });

      router.push("/");
    },
  });

  return (
    <AuthLayout>
      <AuthHeader title="Create an Account" subtitle="Register a new account" />
      <GoogleAuthButton onClick={login} label="Register with Google" />
      <Divider />
      <LoginFormFields check={true} />
      <div className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a
          href="/register"
          className="text-[#3b5d50] font-semibold hover:underline"
        >
          Sign in
        </a>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
