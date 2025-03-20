import React, { Suspense } from "react";
import SignUpForm from "@/app/ui/signup-form";
import Layout from "@/app/(authen)/layout";

const SignUpPage = () => {
  return (
    <Suspense>
      <SignUpForm />
    </Suspense>
  );
};

export default SignUpPage;
