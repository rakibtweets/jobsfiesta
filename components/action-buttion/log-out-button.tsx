"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const LogOutButton = () => {
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
    <Button onClick={() => handleLogOut()} className="w-full">
      Log Out
    </Button>
  );
};
export default LogOutButton;
