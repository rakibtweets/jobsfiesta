"use client";

import {
  BookOpenIcon,
  ChevronDownIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  Plus,
  Save,
  Settings,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

interface IProfileMenuProps {
  name: string | undefined;
  email: string | undefined;
  image?: string | null | undefined;
  accountType: "candidate" | "employee" | undefined;
  role: "admin" | "editor" | "modarator" | undefined;
}

export default function ProfileMenu({ name, email, role, image, accountType }: IProfileMenuProps) {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message);
      }

      return router.push("/auth/sign-in");
    } catch (error) {
      console.log("Logut error", error);
      toast.error("Unknown Logut unsuccessfull");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-auto p-0" asChild>
        <Button variant={"ghost"} className="rounded-full p-0">
          <Avatar>
            <AvatarImage src={image || "https://github.com/shadcn.png"} alt="Profile image" />
            <AvatarFallback>{"kk"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">{name || "unknown"}</span>
          <span className="text-muted-foreground truncate text-xs font-normal">{email || "unnown"}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {accountType === "employee" && (
            <>
              <DropdownMenuItem asChild>
                <Link className="cursor-pointer" href="/dashboard/employee">
                  <LayoutDashboardIcon className="mr-2 size-4" aria-hidden="true" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="cursor-pointer" href="/dashboard/employee/jobs/new">
                  <Plus className="mr-2 size-4" aria-hidden="true" />
                  Post Job
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="cursor-pointer" href="/dashboard/employee/profile">
                  <UserCheck className="mr-2 size-4" aria-hidden="true" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="cursor-pointer" href="/dashboard/employee/settings">
                  <Settings className="mr-2 size-4" aria-hidden="true" />
                  Settings
                </Link>
              </DropdownMenuItem>
            </>
          )}
          {accountType === "candidate" && (
            <>
              <DropdownMenuItem asChild>
                <Link className="cursor-pointer" href="/dashboard/candidate">
                  <LayoutDashboardIcon className="mr-2 size-4" aria-hidden="true" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="cursor-pointer" href="/dashboard/candidate/applications">
                  <Plus className="mr-2 size-4" aria-hidden="true" />
                  Applications
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="cursor-pointer" href="/dashboard/candidate/saved-jobs">
                  <Save className="mr-2 size-4" aria-hidden="true" />
                  Saved Jobs
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="cursor-pointer" href="/dashboard/candidate/profile">
                  <UserCheck className="mr-2 size-4" aria-hidden="true" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="cursor-pointer" href="/dashboard/candidate/settings">
                  <Settings className="mr-2 size-4" aria-hidden="true" />
                  Settings
                </Link>
              </DropdownMenuItem>
            </>
          )}
          {role === "admin" && (
            <DropdownMenuItem>
              <BookOpenIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>Admin Panel</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleLogOut()} variant="destructive">
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
