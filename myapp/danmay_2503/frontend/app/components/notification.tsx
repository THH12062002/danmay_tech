"use client";

import React, { useEffect } from "react";

interface NotificationProps {
  title: string; // Tiêu đề thông báo
  message: string; // Nội dung thông báo
  type?: "success" | "error" | "info" | "warning"; // Loại thông báo
  duration?: number; // Thời gian hiển thị (ms)
  onClose: () => void; // Hàm đóng thông báo
}

const Notification: React.FC<NotificationProps> = ({
  title,
  message,
  type = "info",
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Tự động đóng thông báo sau `duration`
    }, duration);

    return () => clearTimeout(timer); // Dọn dẹp timer khi component bị unmount
  }, [duration, onClose]);

  // Màu sắc dựa trên loại thông báo
  const typeColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 w-80 rounded-lg shadow-lg text-white ${typeColors[type]}`}
    >
      <div className="p-4">
        <h4 className="text-lg font-bold">{title}</h4>
        <p className="text-sm">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-white hover:text-gray-200"
      >
        ✕
      </button>
    </div>
  );
};

export default Notification;
