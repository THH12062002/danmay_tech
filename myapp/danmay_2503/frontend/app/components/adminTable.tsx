"use client";

import React, { useState } from "react";
import { useAllUsers } from "@/app/hooks/useAllUsers";
import { useDeleteUser } from "@/app/hooks/useDeleteUser";
import { useNotification } from "@/app/hooks/useNotification";
import Notification from "@/app/components/notification";
import EditFormDialog from "@/app/components/editFormDialog";
import ConfirmDialog from "@/app/components/confirmDialog";
import UserTable from "@/app/components/userTable";

const AdminTable = () => {
  const { users, loading, error, refetch } = useAllUsers(); // Lấy danh sách user
  const [editDialog, setEditDialog] = useState<{
    isOpen: boolean;
    userId: string | null;
  }>({
    isOpen: false,
    userId: null,
  }); // Trạng thái form chỉnh sửa
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    userId: string | null;
  }>({ isOpen: false, userId: null }); // Trạng thái confirm dialog
  const { notification, showNotification, clearNotification } =
    useNotification(); // Hook thông báo

  const { handleDeleteUser, loading: deleteLoading } = useDeleteUser(); // Hook xóa user

  if (loading) return <p>Loading ...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const openEditDialog = (userId: string) => {
    setEditDialog({ isOpen: true, userId }); // Mở dialog chỉnh sửa
  };

  const closeEditDialog = () => {
    setEditDialog({ isOpen: false, userId: null }); // Đóng dialog chỉnh sửa
  };

  const openConfirmDialog = (userId: string) => {
    setConfirmDialog({ isOpen: true, userId }); // Mở dialog xác nhận
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({ isOpen: false, userId: null }); // Đóng dialog xác nhận
  };

  const handleDelete = async () => {
    if (!confirmDialog.userId) return;

    try {
      await handleDeleteUser(confirmDialog.userId);
      refetch(); // Cập nhật danh sách user
      closeConfirmDialog(); // Đóng dialog
      showNotification("Success", "User deleted successfully!", "success");
    } catch (err: unknown) {
      let errorMessage = "Failed to delete user.";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      showNotification("Error", errorMessage, "error");
    }
  };

  return (
    <div className="overflow-x-auto">
      <UserTable
        users={users}
        onEdit={openEditDialog}
        onDelete={openConfirmDialog}
        deleteLoading={deleteLoading}
      />

      {/* Hiển thị form chỉnh sửa */}
      <EditFormDialog
        isOpen={editDialog.isOpen}
        userId={editDialog.userId}
        onClose={closeEditDialog}
        onSaveSuccess={() => {
          refetch(); // Cập nhật danh sách user
          showNotification("Success", "User updated successfully!", "success");
        }}
      />

      {/* Hiển thị confirm dialog */}
      {confirmDialog.isOpen && (
        <ConfirmDialog
          title="Confirm Delete"
          message="Are you sure you want to delete this user? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={closeConfirmDialog}
        />
      )}

      {/* Hiển thị thông báo */}
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          type={notification.type}
          onClose={clearNotification}
        />
      )}
    </div>
  );
};

export default AdminTable;
