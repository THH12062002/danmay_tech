"use client";

interface UserTableProps {
  users: any[];
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => void;
  deleteLoading: boolean;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onEdit,
  onDelete,
  deleteLoading,
}) => {
  return (
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
            <td className="px-4 py-2 flex gap-2">
              <button
                onClick={() => onEdit(user.id)}
                className="px-3 py-1 text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="px-3 py-1 text-red-500 hover:underline"
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
