import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical, Pencil, Trash2, ShieldCheck, ShieldOff } from "lucide-react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/lib/auth";

// type User = {
//   id: string;
//   email: string;
//   name: string;
//   password?: string;
//   image?: string | null;
//   role: "admin" | "user";
//   candidate?: string | null;
//   employee?: string | null;
//   accountType?: "candidate" | "employee";
// };

const getRoleColor = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-red-100 text-red-800";
    case "user":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const adminUserColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || undefined} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{user.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.email}</span>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original?.role ?? "user";

      return <Badge className={getRoleColor(role)}>{role.charAt(0).toUpperCase() + role.slice(1)}</Badge>;
    },
  },
  {
    accessorKey: "accountType",
    header: "Account Type",
    cell: ({ row }) => row.original.accountType || "—",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      const isAdmin = user.role === "admin";

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-44">
            {/* ✅ Update User */}
            <DropdownMenuItem onClick={() => console.log("Update user:", user.id)}>
              <Pencil className="mr-2 h-4 w-4" />
              Update User
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => console.log("Toggle admin:", user.id)}>
              {isAdmin ? (
                <>
                  <ShieldOff className="mr-2 h-4 w-4" />
                  Remove Admin
                </>
              ) : (
                <>
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Make Admin
                </>
              )}
            </DropdownMenuItem>

            {/* ✅ Delete User */}
            <DropdownMenuItem
              onClick={() => console.log("Delete user:", user.id)}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
