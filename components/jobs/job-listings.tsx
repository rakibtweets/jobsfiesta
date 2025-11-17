/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MapPin, DollarSign, Clock, Bookmark } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const allJobs = [
  {
    id: 1,
    title: "Senior Product Designer",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: "120k - 150k",
    type: "Full-time",
    tags: ["Design", "UI/UX", "Remote"],
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "New York, NY",
    salary: "100k - 130k",
    type: "Full-time",
    tags: ["React", "Node.js", "Full Stack"],
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "DataInc",
    location: "Remote",
    salary: "110k - 140k",
    type: "Full-time",
    tags: ["Python", "ML", "Remote"],
  },
  {
    id: 4,
    title: "Product Manager",
    company: "InnovateCo",
    location: "Boston, MA",
    salary: "130k - 160k",
    type: "Full-time",
    tags: ["Product", "Strategy", "Hybrid"],
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudSystems",
    location: "Austin, TX",
    salary: "105k - 135k",
    type: "Full-time",
    tags: ["AWS", "Docker", "Kubernetes"],
  },
  {
    id: 6,
    title: "Marketing Specialist",
    company: "BrandStudio",
    location: "Los Angeles, CA",
    salary: "70k - 90k",
    type: "Full-time",
    tags: ["Marketing", "Content", "SEO"],
  },
  {
    id: 7,
    title: "Backend Engineer",
    company: "TechCorp",
    location: "Remote",
    salary: "95k - 125k",
    type: "Full-time",
    tags: ["Go", "Microservices", "Cloud"],
  },
  {
    id: 8,
    title: "UX Researcher",
    company: "DesignHub",
    location: "San Francisco, CA",
    salary: "80k - 110k",
    type: "Full-time",
    tags: ["Research", "UX", "User Study"],
  },
];

export default function JobListings({ filters }: { filters: any }) {
  const [saved, setSaved] = useState<number[]>([]);

  const filteredJobs = allJobs.filter((job) => {
    if (filters.search && !job.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.location && job.location !== filters.location) return false;
    if (filters.jobType && job.type !== filters.jobType) return false;
    if (filters.company && !job.company.toLowerCase().includes(filters.company.toLowerCase())) return false;
    return true;
  });

  const toggleSaved = (id: number) => {
    setSaved((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <div className="space-y-4">
      <div className="text-muted-foreground mb-6 text-sm">
        {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} found
      </div>

      {filteredJobs.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No jobs found matching your filters</p>
        </Card>
      ) : (
        filteredJobs.map((job) => (
          <Link key={job.id} href={`/jobs/${job.id}`}>
            <Card className="group mt-4 h-full cursor-pointer p-6 transition-shadow hover:shadow-lg">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="group-hover:text-primary mb-1 text-lg font-semibold transition-colors">{job.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{job.company}</p>

                  <div className="mb-4 grid grid-cols-1 gap-3 text-sm md:grid-cols-3">
                    <div className="text-muted-foreground flex items-center gap-2">
                      <MapPin size={16} />
                      {job.location}
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2">
                      <DollarSign size={16} />
                      {job.salary}
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2">
                      <Clock size={16} />
                      {job.type}
                    </div>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {job.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-secondary/50 text-secondary-foreground rounded-full px-2 py-1 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    variant={saved.includes(job.id) ? "default" : "outline"}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSaved(job.id);
                    }}
                  >
                    <Bookmark size={16} fill={saved.includes(job.id) ? "currentColor" : "none"} />
                  </Button>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </Card>
          </Link>
        ))
      )}
    </div>
  );
}
