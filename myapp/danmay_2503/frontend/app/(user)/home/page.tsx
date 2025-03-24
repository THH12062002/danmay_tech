"use client";

import HomeBanner from "@/app/components/homeBanner";
import HomeTest from "@/app/components/hometest";
import React from "react";

const UserPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-transparent">
      <HomeBanner />
      <HomeTest />
    </main>
  );
};

export default UserPage;
