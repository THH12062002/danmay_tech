"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { deleteUser } from "@/app/services/userService";

export const useDeleteUser = () => {
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState<string | null>(null); // Lỗi nếu có
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Thông báo thành công

  const handleDeleteUser = async (userId: string) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Lấy access_token từ cookie
      const token = Cookies.get("access_token");
      if (!token) {
        throw new Error("Access token is missing");
      }

      // Gọi API xóa user
      await deleteUser(userId, token);
      console.log(`User with ID ${userId} deleted successfully`);

      // Đặt thông báo thành công
      setSuccessMessage("User deleted successfully!");
    } catch (err: any) {
      console.error("Error deleting user:", err);
      setError(err.message || "Failed to delete user");
    } finally {
      setLoading(false); // Kết thúc trạng thái loading
    }
  };

  return { handleDeleteUser, loading, error, successMessage };
};
