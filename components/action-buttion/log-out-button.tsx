"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const LogOutButton = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleLogOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await authClient.signOut();

      if (error) {
        setIsLoading(false);
        toast.error(error.message);
      }

      setIsLoading(false);
      return router.push("/auth/sign-in");
    } catch (error) {
      console.log("Logut error", error);
      setIsLoading(false);
      toast.error("Unknown Logut unsuccessfull");
    }
  };
  return (
    <Button disabled={isLoading} onClick={() => handleLogOut()} className="w-full">
      {isLoading ? "Logging Out..." : "Log Out"}
    </Button>
  );
};
export default LogOutButton;
