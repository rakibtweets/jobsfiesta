/* eslint-disable @typescript-eslint/no-explicit-any */

import { MapPin, Briefcase, Star, Mail, MessageSquare, Download, LinkIcon, CheckCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
  if (!id) return notFound();

  const talent = mockTalentDetails[id];

  if (!talent) {
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
              <AvatarFallback className="from-primary/20 to-accent/20 bg-linear-to-br text-2xl">
                {talent.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="from-primary to-accent mb-2 bg-linear-to-r bg-clip-text text-5xl font-bold text-transparent">
                {talent.name}
              </h1>
              <p className="text-muted-foreground mb-4 text-xl">{talent.title}</p>

              <div className="mb-4 flex flex-wrap gap-3">
                <div className="text-muted-foreground bg-secondary/50 flex items-center gap-2 rounded-lg px-3 py-1">
                  <MapPin size={18} /> {talent.location}
                </div>
                <div className="text-muted-foreground bg-secondary/50 flex items-center gap-2 rounded-lg px-3 py-1">
                  <Briefcase size={18} /> {talent.experience}
                </div>
                <div className="bg-secondary/50 flex items-center gap-2 rounded-lg px-3 py-1">
                  <Star size={18} className="fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold">{talent.rating}</span>
                </div>
              </div>

              <p className="text-muted-foreground mb-4 leading-relaxed">{talent.bio}</p>

              <div className="flex flex-wrap gap-2">
                <Button
                  size="lg"
                  className="from-primary to-accent hover:from-primary/90 hover:to-accent/90 bg-linear-to-r"
                >
                  <Mail size={18} className="mr-2" /> Send Message
                </Button>
                <Button size="lg" variant="outline" className="hover:bg-primary/10 bg-transparent">
                  <Download size={18} className="mr-2" /> Download CV
                </Button>
              </div>
            </div>

            {/* Sidebar Info */}
            <Card className="from-primary/5 to-accent/5 border-primary/20 hover:border-primary/50 border-2 bg-linear-to-br p-6 transition-all duration-300 md:min-w-64">
              <div className="space-y-4">
                <div className="bg-background/50 rounded-lg p-3">
                  <div className="text-muted-foreground mb-1 text-xs font-semibold tracking-wide uppercase">
                    Hourly Rate
                  </div>
                  <div className="from-primary to-accent bg-linear-to-r bg-clip-text text-lg font-semibold text-transparent">
                    {talent.hourly_rate}
                  </div>
                </div>
                <div className="bg-background/50 rounded-lg p-3">
                  <div className="text-muted-foreground mb-1 text-xs font-semibold tracking-wide uppercase">
                    Availability
                  </div>
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle size={16} className="text-green-500" />
                    {talent.availability}
                  </div>
                </div>
                <div className="border-border/50 border-t pt-4">
                  <Button className="from-primary to-accent hover:from-primary/90 hover:to-accent/90 mb-2 w-full bg-linear-to-r font-semibold">
                    <MessageSquare size={18} className="mr-2" /> Hire
                  </Button>
                  <Button variant="outline" className="hover:bg-primary/10 w-full bg-transparent">
                    <LinkIcon size={18} className="mr-2" /> Portfolio
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Skills */}
            <Card className="from-background to-card/50 border-border hover:border-primary/30 group border bg-linear-to-br p-8 transition-all duration-300 hover:shadow-lg">
              <h2 className="group-hover:text-primary mb-4 text-2xl font-bold transition-colors">Skills & Expertise</h2>
              <div className="flex flex-wrap gap-3">
                {talent.skills.map((skill: string, idx: number) => (
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
            {talent.projects && talent.projects.length > 0 && (
              <Card className="from-background to-card/50 border-border hover:border-primary/30 group border bg-linear-to-br p-8 transition-all duration-300 hover:shadow-lg">
                <h2 className="group-hover:text-primary mb-4 text-2xl font-bold transition-colors">Notable Projects</h2>
                <div className="space-y-4">
                  {talent.projects.map((project: any, idx: number) => (
                    <div
                      key={idx}
                      className="border-primary bg-primary/5 hover:bg-primary/10 -m-4 rounded-r-lg border-l-4 p-4 pb-4 pl-4 transition-colors last:pb-0"
                    >
                      <h3 className="text-primary mb-1 text-lg font-semibold">{project.title}</h3>
                      <p className="text-muted-foreground mb-2 text-sm">{project.year}</p>
                      <p className="text-muted-foreground">{project.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Education */}
            {talent.education && talent.education.length > 0 && (
              <Card className="from-background to-card/50 border-border hover:border-primary/30 group border bg-linear-to-br p-8 transition-all duration-300 hover:shadow-lg">
                <h2 className="group-hover:text-primary mb-4 text-2xl font-bold transition-colors">Education</h2>
                <div className="space-y-4">
                  {talent.education.map((edu: any, idx: number) => (
                    <div key={idx} className="bg-primary/5 hover:bg-primary/10 rounded-lg p-4 transition-colors">
                      <h3 className="mb-1 text-lg font-semibold">{edu.degree}</h3>
                      <p className="text-muted-foreground mb-1">{edu.school}</p>
                      <p className="text-muted-foreground text-sm">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Languages */}
            {talent.languages && talent.languages.length > 0 && (
              <Card className="from-background to-card/50 border-border hover:border-primary/30 group border bg-linear-to-br p-8 transition-all duration-300 hover:shadow-lg">
                <h2 className="group-hover:text-primary mb-4 text-2xl font-bold transition-colors">Languages</h2>
                <div className="flex flex-wrap gap-2">
                  {talent.languages.map((lang: string, idx: number) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="border-primary/20 hover:border-primary/50 hover:bg-primary/10 cursor-pointer border-2 px-4 py-2 transition-all"
                    >
                      {lang}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <Card className="from-primary/5 to-accent/5 border-primary/20 hover:border-primary/50 group sticky top-20 border-2 bg-linear-to-br p-6 shadow-lg transition-all duration-300">
              <h3 className="group-hover:text-primary mb-4 text-lg font-semibold transition-colors">Contact & Links</h3>
              <div className="space-y-3">
                {talent.portfolio && (
                  <Button
                    variant="outline"
                    className="hover:bg-primary/10 border-primary/20 hover:border-primary/50 w-full justify-start bg-transparent"
                  >
                    <LinkIcon size={18} className="mr-2" /> Portfolio
                  </Button>
                )}
                {talent.linkedin && (
                  <Button
                    variant="outline"
                    className="hover:bg-primary/10 border-primary/20 hover:border-primary/50 w-full justify-start bg-transparent"
                  >
                    <LinkIcon size={18} className="mr-2" /> LinkedIn
                  </Button>
                )}
                <Button className="from-primary to-accent hover:from-primary/90 hover:to-accent/90 w-full bg-linear-to-r font-semibold">
                  Send Message
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
