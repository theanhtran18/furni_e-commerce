"use client";

import AuthLayout from "@/components/layout/Auth-layout";
import AuthHeader from "@/components/ui/Auth-header";
import VerifyCodeForm from "@/components/form/Verify-code";

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
