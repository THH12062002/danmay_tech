"use client";

import { useState, useEffect } from "react";
import { getUserById } from "@/app/services/userService";
import Cookies from "js-cookie";

export const useGetUserById = (userId: string | null, isOpen: boolean) => {
  const [data, setData] = useState<{
    email: string;
    full_name: string;
    is_active: boolean;
    is_superuser: boolean;
  } | null>(null); // Dữ liệu user
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState<string | null>(null); // Lỗi nếu có

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId || !isOpen) return; // Không làm gì nếu không có userId hoặc dialog chưa mở

      setLoading(true);
      setError(null);

      try {
        const token = Cookies.get("access_token");
        if (!token) {
          throw new Error("Access token is missing");
        }

        const user = await getUserById(userId, token);
        setData({
          email: user.email,
          full_name: user.full_name,
          is_active: user.is_active,
          is_superuser: user.is_superuser,
        });
      } catch (err: any) {
        console.error("Failed to fetch user data:", err);
        setError(err.message || "Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, isOpen]);

  return { data, loading, error };
};
