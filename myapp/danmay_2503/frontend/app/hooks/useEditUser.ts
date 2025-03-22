"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { editUser } from "@/app/services/userService";

export const useEditUser = () => {
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState<string | null>(null); // Lỗi nếu có
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Thông báo thành công

  const handleEditUser = async (
    userId: string,
    userData: {
      full_name?: string;
      is_superuser?: boolean;
      email?: string;
      is_active?: boolean;
      password?: string;
    }
  ) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Lấy access_token từ cookie
      const token = Cookies.get("access_token");
      if (!token) {
        throw new Error("Access token is missing");
      }

      // Gọi API chỉnh sửa user
      const updatedUser = await editUser(userId, token, userData);
      console.log(`User with ID ${userId} updated successfully`, updatedUser);

      // Đặt thông báo thành công
      setSuccessMessage("User updated successfully!");
      return updatedUser; // Trả về user đã được cập nhật
    } catch (err: any) {
      console.error("Error editing user:", err);
      setError(err.message || "Failed to edit user");
      throw err; // Ném lỗi để xử lý ở nơi khác
    } finally {
      setLoading(false); // Kết thúc trạng thái loading
    }
  };

  return { handleEditUser, loading, error, successMessage };
};
