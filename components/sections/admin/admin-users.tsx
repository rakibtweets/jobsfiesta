"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AddUserSheet } from "@/components/admin/add-user-sheet";
import { adminUserColumns } from "@/components/tables/admin-user-table/admin-user-column";
import { AdminUsersTable } from "@/components/tables/admin-user-table/admin-users-table";
import { Button } from "@/components/ui/button";
import { createNewUser } from "@/lib/actions/admin.action";
import { User } from "@/lib/auth";
import { AdminUserCreateValues } from "@/lib/validations/admin.validate";

interface IAdminUserProps {
  users: User[];
}

const AdminUsers = ({ users }: IAdminUserProps) => {
  const [open, setOpen] = useState(false);
  // const [users, setUsers] = useState([
  //   {
  //     id: "1",
  //     email: "admin@example.com",
  //     name: "Admin User",
  //     role: "admin" as const,
  //     image: null,
  //   },
  //   {
  //     id: "2",
  //     email: "user@example.com",
  //     name: "Regular User",
  //     role: "user" as const,
  //     image: null,
  //   },
  // ]);

  const handleAddUser = async (newUser: AdminUserCreateValues) => {
    try {
      const { success, message, error } = await createNewUser(newUser);
      if (success) {
        toast.success(message);
        setOpen(false);
      } else {
        setOpen(false);
        toast.error(error?.message || "Failed to create user");
      }
    } catch (error) {
      setOpen(false);
      console.error("Error adding user:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground mt-1">Manage system users</p>
        </div>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>
      <AdminUsersTable columns={adminUserColumns} data={users} />
      <AddUserSheet open={open} onOpenChange={setOpen} onAddUser={handleAddUser} />
    </>
  );
};
export default AdminUsers;
