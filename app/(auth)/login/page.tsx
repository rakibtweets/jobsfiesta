"use client";

import { Briefcase, Mail, Lock } from "lucide-react";
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

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock authentication
    localStorage.setItem(
      "user",
      JSON.stringify({
        email,
        role: "candidate", // or "employee"
      })
    );

    router.push("/");
  };

  return (
    <section className="bg-background min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left side - Branding */}
          <div className="space-y-8">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary text-primary-foreground rounded-lg p-3">
                  <Briefcase size={28} />
                </div>
                <h1 className="text-3xl font-bold">Jobsfiesta</h1>
              </div>
              <h2 className="mb-4 text-4xl font-bold">Welcome Back</h2>
              <p className="text-muted-foreground text-lg">Sign in to your account to continue your journey</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 mt-1 rounded-lg p-3">
                  <Briefcase className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Find Opportunities</h3>
                  <p className="text-muted-foreground text-sm">Browse thousands of job listings tailored to you</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 mt-1 rounded-lg p-3">
                  <Mail className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Connect with Companies</h3>
                  <p className="text-muted-foreground text-sm">Get noticed by top employers in your field</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <Card className="border-2 p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="email" className="mb-2 block text-base font-semibold">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="text-muted-foreground absolute top-3 left-3" size={20} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="mb-2 block text-base font-semibold">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="text-muted-foreground absolute top-3 left-3" size={20} />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pl-10"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex cursor-pointer items-center gap-2">
                  <input type="checkbox" className="h-4 w-4" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="border-border w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-background text-muted-foreground px-2">Or</span>
                </div>
              </div>

              <Button type="button" variant="outline" size="lg" className="w-full bg-transparent">
                Continue with Google
              </Button>

              <p className="text-muted-foreground text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-primary font-semibold hover:underline">
                  Sign up
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
