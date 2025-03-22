"use client";

import React, { useState, useEffect } from "react";
import { useGetUserById } from "@/app/hooks/useGetUserById";
import { useEditUser } from "@/app/hooks/useEditUser";

interface EditFormDialogProps {
  isOpen: boolean;
  userId: string | null;
  onClose: () => void;
  onSaveSuccess: () => void; // Callback khi lưu thành công
}

const EditFormDialog: React.FC<EditFormDialogProps> = ({
  isOpen,
  userId,
  onClose,
  onSaveSuccess,
}) => {
  const { data, loading: fetching, error } = useGetUserById(userId, isOpen); // Sử dụng hook lấy user
  const { handleEditUser, loading: saving, successMessage } = useEditUser();
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    is_active: true,
    is_superuser: false,
    password: "",
  });

  // Cập nhật formData khi dữ liệu user thay đổi
  useEffect(() => {
    if (data) {
      setFormData({
        email: data.email,
        full_name: data.full_name,
        is_active: data.is_active,
        is_superuser: data.is_superuser,
        password: "", // Để trống password
      });
    }
  }, [data]);

  const handleChange = (
    field: string,
    value: string | number | boolean | null | undefined
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!userId) return;

    try {
      await handleEditUser(userId, {
        email: formData.email,
        full_name: formData.full_name,
        is_active: formData.is_active,
        is_superuser: formData.is_superuser,
        password: formData.password || undefined, // Chỉ gửi password nếu có
      });

      // Gọi callback khi lưu thành công
      onSaveSuccess();
      onClose();
    } catch (err) {
      console.error("Failed to save user:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-lg bg-white shadow-lg p-6">
        <h4 className="text-lg font-bold text-gray-800">Edit User</h4>
        <p className="text-sm text-gray-600">Update the user details below.</p>

        {fetching && <p className="text-sm text-gray-500 mt-2">Loading...</p>}
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        {successMessage && (
          <p className="text-sm text-green-500 mt-2">{successMessage}</p>
        )}

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            value={formData.full_name}
            onChange={(e) => handleChange("full_name", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Set Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            checked={formData.is_superuser}
            onChange={(e) => handleChange("is_superuser", e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">
            Is superuser?
          </label>
        </div>
        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            checked={formData.is_active}
            onChange={(e) => handleChange("is_active", e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">
            Is active?
          </label>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFormDialog;
