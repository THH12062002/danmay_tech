"use client";

import React from "react";

interface ConfirmDialogProps {
  title: string; // Tiêu đề của dialog
  message: string; // Nội dung của dialog
  onConfirm: () => void; // Hàm được gọi khi nhấn "Confirm"
  onCancel: () => void; // Hàm được gọi khi nhấn "Cancel"
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-lg bg-white shadow-lg">
        <div className="p-4">
          <h4 className="text-lg font-bold text-gray-800">{title}</h4>
          <p className="mt-2 text-sm text-gray-600">{message}</p>
        </div>
        <div className="flex justify-end gap-2 p-4 border-t border-gray-200">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
