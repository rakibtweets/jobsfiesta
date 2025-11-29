"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ChangePasswordForm } from "@/components/forms/auth/change-password-form";
import { resetPassword } from "@/lib/actions/auth.action";
import { PasswordFormValues } from "@/lib/validations/auth";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");
  // if (!token) redirect("/auth/sign-in");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      router.replace("/auth/sign-in");
    } else {
    }
  }, [token, router]);

  const handleResetPassword = async (data: PasswordFormValues) => {
    if (!token) return;
    setLoading(true);
    setSuccess(false);

    const { success, error, message } = await resetPassword(data.confirmPassword, token);
    if (success) {
      toast.success(message);
      setSuccess(true);
      setLoading(false);
      return router.push("/auth/sign-in");
    } else {
      setLoading(false);
      toast.error(error?.message || "Failed to send verification email.");
    }
  };

  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center px-4">
      <div className="bg-background w-full max-w-md space-y-6 rounded-2xl border p-6 shadow-lg">
        <h1 className="text-xl font-semibold">Reset Password</h1>
        <p className="text-muted-foreground text-sm">Enter your new password below.</p>

        <ChangePasswordForm
          onSubmit={handleResetPassword}
          loading={loading}
          buttonText="Reset Password"
          showCurrentPassword={false}
        />

        {success && <p className="text-center text-sm text-green-600">Password reset successfully ✅</p>}
      </div>
    </div>
  );
}
