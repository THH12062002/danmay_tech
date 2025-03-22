import axios from "axios";
import Cookies from "js-cookie";

export interface SignUpData {
  full_name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

// Hàm đăng ký người dùng
export const signUp = async (data: SignUpData): Promise<void> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/signup`, data);

    if (response.status !== 200) {
      throw new Error(response.data.message || "Signup Failed");
    }
  } catch (error: any) {
    if (error.message && error.response?.data) {
      throw new Error(error.response.data.message || "Signup Failed");
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};

// Hàm đăng nhập người dùng
export const login = async (data: LoginData): Promise<string> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/login/access-token`,
      new URLSearchParams({
        username: data.email, // Sử dụng `username` thay vì `email`
        password: data.password,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.status === 200) {
      const token = response.data.access_token;

      // Lưu token vào cookie
      Cookies.set("access_token", token, { expires: 7 });

      return token; // Trả về access_token
    } else {
      throw new Error("Login Failed");
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.detail || "An unknown error occurred."
    );
  }
};

// Hàm đăng xuất người dùng
export const signOut = (): void => {
  // Xóa token khỏi cookie
  Cookies.remove("access_token");
};
