import AdminTable from "@/app/components/adminTable";
import { lusitana } from "@/app/ui/fonts";
import React, { Suspense } from "react";

const AdminPage = () => {
  return (
    <main className="p-6 min-h-screen">
      <h1
        className={`${lusitana.className} mb-6 text-2xl font-bold text-gray-800`}
      >
        User Management
      </h1>
      <Suspense>
        <AdminTable />
      </Suspense>
    </main>
  );
};

export default AdminPage;
