"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const AuthenSwitch = () => {
  const currentPath = usePathname();
  return (
    <div className="flex justify-between bg-transparent rounded-lg shadow p-2">
      <Link
        href="/login"
        className={`w-1/2 text-center py-2 rounded-md ${
          currentPath === "/login"
            ? "bg-blue-500 text-white"
            : "text-gray-700 hover:bg-gray-200"
        }`}
      >
        Login
      </Link>
      <Link
        href="/signup"
        className={`w-1/2 text-center py-2 rounded-md ${
          currentPath === "/signup"
            ? "bg-blue-500 text-white"
            : "text-gray-700 hover:bg-gray-200"
        }`}
      >
        Signup
      </Link>
    </div>
  );
};

export default AuthenSwitch;
