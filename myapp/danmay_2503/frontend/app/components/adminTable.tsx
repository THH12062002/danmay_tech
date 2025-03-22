"use client";

import React from "react";
import { useUsers } from "@/app/hooks/useUsers";

const AdminTable = () => {
  const { users, loading, error } = useUsers();

  if (loading) return <p>Loading ...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="px-4 py-2 text-left font-medium">Full name</th>
            <th className="px-4 py-2 text-left font-medium">Email</th>
            <th className="px-4 py-2 text-left font-medium">Role</th>
            <th className="px-4 py-2 text-left font-medium">Status</th>
            <th className="px-4 py-2 text-left font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr
              key={user.id}
              className="border-t border-gray-200 hover:bg-gray-100"
            >
              <td className="px-4 py-2">{user.full_name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">
                {user.is_superuser ? "Admin" : "User"}
              </td>
              <td className="px-4 py-2 text-green-600">
                {user.is_active ? "Active" : "Inactive"}
              </td>
              <td className="px-4 py-2">
                <button className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
