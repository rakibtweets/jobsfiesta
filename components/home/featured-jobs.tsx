import { MapPin, DollarSign, Clock } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const mockJobs = [
  {
    id: 1,
    title: "Senior Product Designer",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: "$120k - $150k",
    type: "Full-time",
    tags: ["Design", "UI/UX", "Remote"],
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "New York, NY",
    salary: "$100k - $130k",
    type: "Full-time",
    tags: ["React", "Node.js", "Full Stack"],
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "DataInc",
    location: "Remote",
    salary: "$110k - $140k",
    type: "Full-time",
    tags: ["Python", "ML", "Remote"],
  },
  {
    id: 4,
    title: "Product Manager",
    company: "InnovateCo",
    location: "Boston, MA",
    salary: "$130k - $160k",
    type: "Full-time",
    tags: ["Product", "Strategy", "Hybrid"],
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudSystems",
    location: "Austin, TX",
    salary: "$105k - $135k",
    type: "Full-time",
    tags: ["AWS", "Docker", "Kubernetes"],
  },
  {
    id: 6,
    title: "Marketing Specialist",
    company: "BrandStudio",
    location: "Los Angeles, CA",
    salary: "$70k - $90k",
    type: "Full-time",
    tags: ["Marketing", "Content", "SEO"],
  },
];

export default function FeaturedJobs() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-center justify-between">
          <div className="animate-fade-in">
            <h2 className="from-primary to-accent mb-2 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              Featured Jobs
            </h2>
            <p className="text-muted-foreground">Exciting opportunities from top companies</p>
          </div>
          <Button variant="outline" asChild className="hover:bg-primary/10 hidden bg-transparent md:flex">
            <Link href="/jobs">View All Jobs</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockJobs.map((job, idx) => (
            <Link key={job.id} href={`/jobs/${job.id}`}>
              <div className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <Card className="group border-border hover:border-primary/50 from-background to-card/50 h-full cursor-pointer border bg-gradient-to-br p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="space-y-4">
                    <div>
                      <h3 className="group-hover:text-primary line-clamp-2 text-lg font-semibold transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-muted-foreground group-hover:text-foreground text-sm transition-colors">
                        {job.company}
                      </p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="text-muted-foreground group-hover:text-foreground flex items-center gap-2 transition-colors">
                        <MapPin size={16} />
                        {job.location}
                      </div>
                      <div className="text-muted-foreground group-hover:text-foreground flex items-center gap-2 transition-colors">
                        <DollarSign size={16} />
                        {job.salary}
                      </div>
                      <div className="text-muted-foreground group-hover:text-foreground flex items-center gap-2 transition-colors">
                        <Clock size={16} />
                        {job.type}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {job.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="from-primary/10 to-accent/10 text-primary group-hover:from-primary/20 group-hover:to-accent/20 rounded-full bg-gradient-to-r px-2 py-1 text-xs transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button className="from-primary to-accent hover:from-primary/90 hover:to-accent/90 mt-4 w-full bg-gradient-to-r">
                      Apply Now
                    </Button>
                  </div>
                </Card>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button size="lg" asChild className="from-primary to-accent bg-gradient-to-r">
            <Link href="/jobs">View All Jobs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
