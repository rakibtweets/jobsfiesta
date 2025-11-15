import { Users, Home, LayoutDashboard, Layers, Heart } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// import LogoutButton from "../buttons/LogoutButton";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Employee Dashboard",
    url: "/dashboard/employee",
    icon: LayoutDashboard,
  },
  {
    title: "Job Posts",
    url: "/dashboard/employee/jobs",
    icon: Layers,
  },
  {
    title: "Save candidates",
    url: "/dashboard/candidate/save-candiates",
    icon: Heart,
  },
  {
    title: "Proile",
    url: "/dashboard/employee/profile",
    icon: Users,
  },
];

export function EmployeeDashboardSidebar() {
  return (
    <Sidebar side="left" collapsible="icon" variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button>Log Out</Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
