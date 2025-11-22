/* eslint-disable @typescript-eslint/no-explicit-any */

import { MapPin, Briefcase, Download, LinkIcon, CheckCircle } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCandidateById } from "@/lib/actions/candidate.action";

const mockTalentDetails: Record<string, any> = {
  "1": {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Product Designer",
    location: "San Francisco, CA",
    experience: "5-10 years",
    skills: ["UI/UX", "Figma", "Prototyping", "User Research", "Interaction Design"],
    rating: 4.8,
    avatar: "SJ",
    bio: "Passionate product designer with a proven track record of creating user-centered solutions. Specializing in B2B SaaS and mobile applications.",
    projects: [
      {
        title: "E-commerce Platform Redesign",
        description: "Led design overhaul resulting in 40% increase in conversion rate",
        year: "2023",
      },
      {
        title: "Mobile App Design System",
        description: "Built comprehensive design system used by 30+ designers",
        year: "2022",
      },
    ],
    education: [{ degree: "Bachelor's in Graphic Design", school: "California Institute of Design", year: "2018" }],
    languages: ["English", "Spanish", "French"],
    hourly_rate: "$85-$120",
    availability: "Available for contract work",
    portfolio: "https://sarahjohnson.design",
    linkedin: "https://linkedin.com/in/sarahjohnson",
  },
};

export default async function TalentDetailsPage({ params }: RouteParams) {
  const { id } = await params;
  const { data } = await getCandidateById(id);

  const candidate = data?.candidate;
  // if (!candidate) return notFound();

  if (!candidate) {
    return (
      <section className="bg-background min-h-screen">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-2xl font-bold">Talent not found</h1>
          <Button asChild>
            <Link href="/talents">Back to Talents</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="from-background to-card/30 min-h-screen bg-linear-to-b">
      {/* Animated header background */}
      <div className="from-primary/5 pointer-events-none absolute inset-0 h-96 bg-linear-to-b via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="animate-fade-in mb-8">
          <div className="mb-6 flex flex-col gap-6 md:flex-row">
            <Avatar className="ring-primary/20 h-24 w-24 ring-4">
              <AvatarImage src={candidate?.photo?.url} alt={candidate?.name} />
              <AvatarFallback className="from-primary/20 to-accent/20 bg-linear-to-br text-2xl">
                {candidate?.name}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="from-primary to-accent mb-2 bg-linear-to-r bg-clip-text text-5xl font-bold text-transparent">
                {candidate?.name}
              </h1>
              <p className="text-muted-foreground mb-4 text-xl">{candidate?.headline}</p>

              <div className="mb-4 flex flex-wrap gap-3">
                <div className="text-muted-foreground bg-secondary/50 flex items-center gap-2 rounded-lg px-3 py-1">
                  <MapPin size={18} /> {`${candidate?.location?.country}, ${candidate?.location?.country}`}
                </div>
              </div>

              <p className="text-muted-foreground mb-4 leading-relaxed">{candidate?.bio}</p>

              <div className="flex flex-wrap gap-2">
                <Button size="lg" variant="outline" className="hover:bg-primary/10 bg-transparent">
                  <Download size={18} className="mr-2" /> Download CV
                </Button>
              </div>
            </div>

            {/* Sidebar Info */}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Skills */}
            <Card className="from-background to-card/50 border-border hover:border-primary/30 group border bg-linear-to-br p-8 transition-all duration-300 hover:shadow-lg">
              <h2 className="group-hover:text-primary mb-4 text-2xl font-bold transition-colors">Skills & Expertise</h2>
              <div className="flex flex-wrap gap-3">
                {candidate?.skills.map((skill: string, idx: number) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 border-primary/20 hover:border-primary/50 cursor-pointer border bg-linear-to-r px-4 py-2 text-base transition-all"
                  >
                    <CheckCircle size={16} className="text-primary mr-2" />
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Projects */}

            {/* Education */}
            {candidate?.education && candidate?.education.length > 0 && (
              <Card className="from-background to-card/50 border-border hover:border-primary/30 group border bg-linear-to-br p-8 transition-all duration-300 hover:shadow-lg">
                <h2 className="group-hover:text-primary mb-4 text-2xl font-bold transition-colors">Education</h2>
                <div className="space-y-4">
                  {candidate?.education.map((edu, idx: number) => (
                    <div key={idx} className="bg-primary/5 hover:bg-primary/10 rounded-lg p-4 transition-colors">
                      <h3 className="mb-1 text-lg font-semibold">{edu.degree}</h3>
                      <p className="text-muted-foreground mb-1">{edu.institution}</p>
                      <p className="text-muted-foreground text-sm">
                        {edu?.graduationYear?.getFullYear() || "Not provided"}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Languages */}
          </div>

          {/* Right Sidebar */}
        </div>
      </div>
    </section>
  );
}
