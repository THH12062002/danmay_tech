import React, { Suspense } from "react";
import LoginForm from "@/app/ui/login-form";

const LoginPage = () => {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
