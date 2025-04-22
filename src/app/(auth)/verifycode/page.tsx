"use client";

import AuthLayout from "@/components/layout/auth-layout";
import AuthHeader from "@/components/ui/auth-header";
import VerifyCodeForm from "@/components/form/verify-code";

const VerifyCodePage = () => {
  return (
    <>
      <AuthLayout>
        <AuthHeader title="Verify Code" subtitle="Nhập mã xác minh" />
        <VerifyCodeForm />
      </AuthLayout>
    </>
  );
};

export default VerifyCodePage;
