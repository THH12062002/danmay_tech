import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const getUsers = async (token: string) => {
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
