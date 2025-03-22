"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/app/services/userService";
import Cookies from "js-cookie";

export const useCurrentUser = () => {
  const [user, setUser] = useState<any>(null); // Thông tin người dùng hiện tại
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(""); // Lỗi nếu có

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = Cookies.get("access_token"); // Lấy token từ cookie
        if (!token) throw new Error("Access token is missing");
        const data = await getCurrentUser(token); // Gọi API /users/me
        setUser(data); // Lưu thông tin người dùng vào state
      } catch (err: any) {
        setError(err.message || "Failed to fetch current user");
      } finally {
        setLoading(false); // Kết thúc trạng thái loading
      }
    };

    fetchCurrentUser();
  }, []);

  return { user, loading, error };
};
