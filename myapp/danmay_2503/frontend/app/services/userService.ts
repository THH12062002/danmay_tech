import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const getAllUsers = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Failed to fetch users:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getUserById = async (userId: string, token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Failed to fetch user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getCurrentUser = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Failed to fetch current user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Hàm chỉnh sửa thông tin user
export const editUser = async (
  userId: string,
  token: string,
  userData: {
    full_name?: string;
    email?: string;
    is_active?: boolean;
    is_superuser?: boolean; // Thêm is_superuser
    password?: string; // Nếu cần chỉnh sửa password
  }
) => {
  // Kiểm tra dữ liệu đầu vào
  if (!userId) {
    throw new Error("User ID is required");
  }
  if (!token) {
    throw new Error("Authorization token is required");
  }
  if (Object.keys(userData).length === 0) {
    throw new Error("No data provided for update");
  }

  try {
    const response = await axios.patch(
      `${API_BASE_URL}/users/${userId}`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.response?.data || error.message;
    console.error("Failed to edit user:", errorMessage);
    throw new Error(errorMessage); // Ném lỗi chi tiết hơn
  }
};

// Hàm xóa user
export const deleteUser = async (userId: string, token: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Failed to delete user:",
      error.response?.data || error.message
    );
    throw error;
  }
};
