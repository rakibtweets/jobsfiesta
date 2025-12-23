"use client";

import { Briefcase, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Role = "employee" | "candidate" | "";

interface RoleCardProps {
  role: "employee" | "candidate";
  selectedRole: Role;
  onSelect: (role: Role) => void;
}

const RoleCard = ({ role, selectedRole, onSelect }: RoleCardProps) => {
  const isSelected = selectedRole === role;

  const Icon = role === "employee" ? Briefcase : UserRound;
  const title = role === "employee" ? "I'm an Employee" : "I'm a Jobseeker";
  const subtitle = role === "employee" ? "Looking for talented candidates" : "Looking for job";

  return (
    <Card
      onClick={() => onSelect(role)}
      className={`cursor-pointer transition-all hover:shadow-lg ${isSelected ? "border-2 border-green-500" : ""}`}
    >
      <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
        <Icon size={48} className={isSelected ? "text-green-500" : "text-muted-foreground"} />
        <h3 className={`text-xl font-semibold ${isSelected ? "text-green-500" : ""}`}>{title}</h3>
        <p className="text-muted-foreground text-sm">{subtitle}</p>
      </CardContent>
    </Card>
  );
};

const SelectProfilePage = () => {
  const [selectedRole, setSelectedRole] = useState<Role>("");
  const [loading, setLoading] = useState(false);
  //   const router = useRouter();

  const ROLE_ROUTES: Record<"employee" | "candidate", string> = {
    employee: "/account/new-employee",
    candidate: "/account/new-candidate",
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!selectedRole) {
      e.preventDefault();
      toast.error("Please select a role to continue");
    } else {
      setLoading(true);
    }
  };

  //   const handleContinue = () => {
  //     if (!selectedRole) return;

  //     try {
  //       setLoading(true);
  //       router.push(ROLE_ROUTES[selectedRole]);
  //     } catch (error) {
  //       console.error(error);
  //       toast.error("Something went wrong");
  //     }
  //   };

  return (
    <div className="container mx-auto py-16">
      <h1 className="mb-10 text-center text-3xl font-bold tracking-tight">Join as a client or jobseeker</h1>
      {/* Role Selection */}
      <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
        <RoleCard role="employee" selectedRole={selectedRole} onSelect={setSelectedRole} />
        <RoleCard role="candidate" selectedRole={selectedRole} onSelect={setSelectedRole} />
      </div>

      {/* Action Area */}
      <div className="mt-10 flex flex-col items-center gap-4">
        <Button
          size="lg"
          //   variant={!selectedRole || loading ? "outline" : "default"}
          className="rounded-full px-10"
          disabled={!selectedRole || loading}
          asChild
        >
          <Link
            href={selectedRole ? ROLE_ROUTES[selectedRole] : "#"}
            onClick={handleButtonClick}
            aria-disabled={!selectedRole || loading}
          >
            {loading
              ? "Processing..."
              : !selectedRole
                ? "Create Account"
                : selectedRole === "employee"
                  ? "Continue as Employee"
                  : "Continue as Jobseeker"}
          </Link>
        </Button>

        <Link href="/" className="text-muted-foreground text-sm font-medium transition-colors hover:text-green-500">
          Skip for now
        </Link>

        <p className="text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="font-semibold text-green-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SelectProfilePage;
