"use client";

import React, { useEffect } from "react";
import { useCurrentUser } from "@/app/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

const UserRedirect = () => {
  const { user, loading, error } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      if (user.is_superuser) {
        router.push("/dashboard"); // Chuyển hướng admin đến /dashboard
      } else {
        router.push("/home"); // Chuyển hướng user đến /user
      }
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return null; // Không render gì vì chỉ dùng để chuyển hướng
};

export default UserRedirect;
