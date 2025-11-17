"use client";

import { Briefcase, Mail, Lock, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<"candidate" | "employee">("candidate");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    localStorage.setItem(
      "user",
      JSON.stringify({
        name: formData.name,
        email: formData.email,
        role,
      })
    );

    router.push(role === "candidate" ? "/dashboard/candidate" : "/dashboard/employee");
  };

  return (
    <section className="bg-background min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left side - Info */}
          <div className="space-y-8">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary text-primary-foreground rounded-lg p-3">
                  <Briefcase size={28} />
                </div>
                <h1 className="text-3xl font-bold">Jobsfiesta</h1>
              </div>
              <h2 className="mb-4 text-4xl font-bold">Join Jobsfiesta Today</h2>
              <p className="text-muted-foreground text-lg">Choose your path and unlock opportunities</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 mt-1 rounded-lg p-3">
                  <Users className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">For Candidates</h3>
                  <p className="text-muted-foreground text-sm">Find your dream job and grow your career</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 mt-1 rounded-lg p-3">
                  <Briefcase className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">For Employers</h3>
                  <p className="text-muted-foreground text-sm">Find and hire top talent for your team</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Signup Form */}
          <Card className="border-2 p-8">
            <form onSubmit={handleSignup} className="space-y-6">
              {/* Role Selection */}
              <div>
                <Label className="mb-4 block text-base font-semibold">I&apos;m a...</Label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRole("candidate")}
                    className={`rounded-lg border-2 p-4 transition-all ${
                      role === "candidate" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="font-semibold">Candidate</div>
                    <div className="text-muted-foreground text-xs">Looking for jobs</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("employee")}
                    className={`rounded-lg border-2 p-4 transition-all ${
                      role === "employee" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="font-semibold">Employer</div>
                    <div className="text-muted-foreground text-xs">Hiring talents</div>
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="name" className="mb-2 block text-base font-semibold">
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12"
                  required
                />
              </div>

              <div>
                <Label htmlFor="signup-email" className="mb-2 block text-base font-semibold">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="text-muted-foreground absolute top-3 left-3" size={20} />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12 pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="signup-password" className="mb-2 block text-base font-semibold">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="text-muted-foreground absolute top-3 left-3" size={20} />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="h-12 pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="confirm-password" className="mb-2 block text-base font-semibold">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="text-muted-foreground absolute top-3 left-3" size={20} />
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="h-12 pl-10"
                    required
                  />
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-2">
                <input type="checkbox" className="mt-1 h-4 w-4" required />
                <span className="text-muted-foreground text-sm">
                  I agree to the{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>

              <p className="text-muted-foreground text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </Card>
        </div>
      </div>
      <Footer />
    </section>
  );
}
