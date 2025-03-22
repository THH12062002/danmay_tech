import { useState } from "react";

export const useNotification = () => {
  const [notification, setNotification] = useState<{
    title: string;
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showNotification = (
    title: string,
    message: string,
    type: "success" | "error"
  ) => {
    setNotification({ title, message, type });
  };

  const clearNotification = () => {
    setNotification(null);
  };

  return { notification, showNotification, clearNotification };
};
