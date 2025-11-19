"use client";
import {
  BookOpenIcon,
  ChevronDownIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  PinIcon,
  UserCheck,
  UserPenIcon,
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
  image?: string | undefined;
  accountType: "candidate" | "employee" | undefined;
  role: "admin" | "editor" | "modarator" | undefined;
}

export default function ProfileMenu({ name, email, role }: IProfileMenuProps) {
  const router = useRouter();

  const handleLogOut = async () => {
    console.log("logout....");
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message);
      }

      return router.push("/login");
    } catch (error) {
      console.log("Logut error", error);
      toast.error("Unknown Logut unsuccessfull");
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src={"https://github.com/shadcn.png"} alt="Profile image" />
            <AvatarFallback>{"kk"}</AvatarFallback>
          </Avatar>
          <ChevronDownIcon size={16} className="opacity-60" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">{name || "unknown"}</span>
          <span className="text-muted-foreground truncate text-xs font-normal">{email || "unnown"}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link className="cursor-pointer" href="/dashboard">
              <LayoutDashboardIcon className="mr-2 size-4" aria-hidden="true" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link className="cursor-pointer" href="/profile">
              <UserCheck className="mr-2 size-4" aria-hidden="true" />
              Profile
            </Link>
          </DropdownMenuItem>
          {role === "admin" && (
            <DropdownMenuItem>
              <BookOpenIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>Admin Panel</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <PinIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 4</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserPenIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 5</span>
          </DropdownMenuItem>
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
