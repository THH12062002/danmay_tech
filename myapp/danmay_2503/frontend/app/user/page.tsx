"use client";

import React from "react";
import { signOut } from "@/app/services/authService";
import { useRouter } from "next/navigation";
import { PowerIcon, UserCircleIcon } from "@heroicons/react/24/outline";

const UserPage = () => {
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push("/login");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
        <div className="flex items-center justify-center bg-blue-500 p-6 rounded-t-lg">
          <UserCircleIcon className="h-16 w-16 text-white" />
        </div>
        <div className="p-6">
          <h1 className="text-center text-2xl font-bold text-gray-800">
            Welcome, User!
          </h1>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
            >
              <PowerIcon className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserPage;
