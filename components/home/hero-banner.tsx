"use client";

import { Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Animated gradient background */}
      <div className="from-primary/20 to-accent/20 absolute inset-0 animate-pulse bg-linear-to-br via-transparent" />

      {/* Animated blurred circles */}
      <div className="bg-primary/30 animate-blob absolute top-0 -left-40 h-80 w-80 rounded-full mix-blend-multiply blur-3xl filter" />
      <div className="bg-accent/30 animate-blob animation-delay-2000 absolute top-0 -right-40 h-80 w-80 rounded-full mix-blend-multiply blur-3xl filter" />
      <div className="bg-primary/20 animate-blob animation-delay-4000 absolute -bottom-40 left-1/2 h-80 w-80 rounded-full mix-blend-multiply blur-3xl filter" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 text-center">
          <div className="animate-fade-in space-y-4">
            <div className="inline-block">
              <span className="bg-primary/10 border-primary/20 text-primary rounded-full border px-4 py-2 text-sm font-semibold">
                Welcome to Jobsfiesta Platform
              </span>
            </div>
            <h1 className="from-primary via-primary to-accent bg-linear-to-r bg-clip-text text-5xl leading-tight font-bold text-balance text-transparent md:text-7xl">
              Find Your <span className="text-primary">Dream Job</span> Today
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed text-balance md:text-xl">
              Connect with top companies and unlock your career potential. Jobsfiesta makes job hunting simple and
              effective.
            </p>
          </div>

          {/* Search Bar with hover effect */}
          <div className="group mx-auto flex max-w-2xl gap-2">
            <div className="relative flex-1">
              <div className="from-primary to-accent absolute inset-0 rounded-lg bg-linear-to-r opacity-0 blur transition duration-300 group-hover:opacity-100" />
              <div className="bg-background border-border group-hover:border-primary/50 relative flex items-center rounded-lg border transition-all">
                <Search
                  className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 transform"
                  size={20}
                />
                <Input
                  placeholder="Job title, keywords, or company..."
                  className="h-12 rounded-lg border-0 bg-transparent pl-10"
                />
              </div>
            </div>
            <Button size="lg" className="group/btn relative overflow-hidden rounded-lg">
              <span className="from-primary to-accent absolute inset-0 bg-linear-to-r opacity-0 transition duration-300 group-hover/btn:opacity-100" />
              <Link href="/jobs" className="relative">
                Search
              </Link>
            </Button>
          </div>

          {/* Stats with animated counters */}
          <div className="grid grid-cols-1 gap-8 pt-8 md:grid-cols-3">
            {[
              { number: "5000+", label: "Active Jobs" },
              { number: "2000+", label: "Companies" },
              { number: "50000+", label: "Candidates" },
            ].map((stat, idx) => (
              <div key={idx} className="group cursor-pointer space-y-2">
                <div className="text-primary text-4xl font-bold transition-transform duration-300 group-hover:scale-110">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
