"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/app/services/userService";
import Cookies from "js-cookie";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = Cookies.get("access_token"); // Lấy token từ cookie
        if (!token) {
          throw new Error("Access token is missing");
        }
        const data = await getUsers(token);
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
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};
