"use client";

import { useEffect, useState, useCallback } from "react";
import { getAllUsers } from "@/app/services/userService";
import Cookies from "js-cookie";

export const useAllUsers = () => {
  const [users, setUsers] = useState([]); // Danh sách user
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(""); // Lỗi nếu có

  // Hàm fetch dữ liệu user
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const token = Cookies.get("access_token"); // Lấy token từ cookie
      if (!token) {
        throw new Error("Access token is missing");
      }
      const data = await getAllUsers(token);
      setUsers(data.data); // Giả sử API trả về { data: [...] }
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError("You do not have permission to access this resource.");
      } else {
        setError(err.message || "Failed to fetch users");
      }
    } finally {
      setLoading(false);
    }
  }, []); // useCallback để tránh tạo lại hàm khi component re-render

  // Gọi fetchUsers khi component được mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, refetch: fetchUsers }; // Trả về hàm refetch
};
