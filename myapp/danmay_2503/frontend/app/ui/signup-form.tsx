"use client";

import {
  EnvelopeIcon,
  UserCircleIcon,
  KeyIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Kiểm tra confirm_password
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: formData.full_name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup Failed");
      }

      // Nếu thành công
      setSuccess("Signup successful! Please log in.");
      setFormData({
        full_name: "",
        email: "",
        password: "",
        confirm_password: "",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-2 bg-gray-50">
      <div className="flex flex-col w-full gap-2 bg-gray-50 pb-4">
        {/* Fullname Input */}
        <div className="relative mt-4">
          <input
            id="name"
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            placeholder="Fullname"
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-balance outline-2 placeholder:text-gray-500"
          />
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        {/* Email Input */}
        <div className="relative mt-4">
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-balance outline-2 placeholder:text-gray-500"
          />
          <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        {/* Password Input */}
        <div className="relative mt-4">
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-balance outline-2 placeholder:text-gray-500"
          />
          <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        {/* Confirm Password Input */}
        <div className="relative mt-4">
          <input
            id="confirm_password"
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
            placeholder="Confirm Password"
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-balance outline-2 placeholder:text-gray-500"
          />
          <CheckCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        {/* Signup Button */}
        <button
          type="submit"
          className="mt-6 flex w-full h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        >
          Signup
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </button>
      </div>
      {/* Error and Success Messages */}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </form>
  );
};

export default SignUpForm;
