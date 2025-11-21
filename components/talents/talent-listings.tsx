import { MapPin, Briefcase } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAllCandidates } from "@/lib/actions/candidate.action";
const allTalents = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Product Designer",
    location: "San Francisco, CA",
    experience: "5-10 years",
    skills: ["UI/UX", "Figma", "Prototyping", "User Research"],
    rating: 4.8,
    avatar: "SJ",
  },
  {
    id: 2,
    name: "Alex Chen",
    title: "Full Stack Developer",
    location: "Remote",
    experience: "2-5 years",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    rating: 4.9,
    avatar: "AC",
  },
  {
    id: 3,
    name: "Emma Martinez",
    title: "Data Scientist",
    location: "Boston, MA",
    experience: "5-10 years",
    skills: ["Python", "Machine Learning", "Data Analysis", "TensorFlow"],
    rating: 4.7,
    avatar: "EM",
  },
  {
    id: 4,
    name: "James Wilson",
    title: "DevOps Engineer",
    location: "Austin, TX",
    experience: "10+ years",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    rating: 4.9,
    avatar: "JW",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    title: "Product Manager",
    location: "New York, NY",
    experience: "5-10 years",
    skills: ["Product Strategy", "Data Analytics", "Leadership", "User Testing"],
    rating: 4.8,
    avatar: "LA",
  },
  {
    id: 6,
    name: "Michael Brown",
    title: "Frontend Developer",
    location: "Los Angeles, CA",
    experience: "2-5 years",
    skills: ["React", "Vue", "CSS", "JavaScript"],
    rating: 4.6,
    avatar: "MB",
  },
];

export default async function TalentListings(query: PaginatedSearchParams) {
  const { search, country, skill, page, limit } = await query;
  const { data } = await getAllCandidates({
    search: search || "",
    country: country || "",
    page: page || 1,
    skill: skill || "",
    limit: limit || 10,
  });

  const candidates = data?.candidates || [];

  return (
    <div className="space-y-4">
      <div className="text-muted-foreground mb-6 text-sm">
        {candidates.length} talent{candidates.length !== 1 ? "s" : ""} found
      </div>

      {candidates.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No talents found matching your filters</p>
        </Card>
      ) : (
        candidates.map((talent) => (
          <Link key={String(talent._id)} href={`/talents/${talent._id}`}>
            <Card className="group mt-4 h-full cursor-pointer p-6 transition-shadow hover:shadow-lg">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                {/* LEFT — Avatar + Info */}
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Avatar className="h-12 w-12 shrink-0">
                    <AvatarImage src={talent?.photo?.url || "https://github.com/shadcn.png"} />
                    <AvatarFallback>{talent.name.charAt(0).toLocaleUpperCase() || ""}</AvatarFallback>
                  </Avatar>

                  <div>
                    <div className="flex w-full flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="group-hover:text-primary text-lg font-semibold transition-colors">
                          {talent?.name}
                        </h3>
                        <p className="text-muted-foreground mb-3 text-sm">{talent?.headline}</p>
                      </div>
                    </div>

                    {/* Details (Location + Experience) */}
                    <div className="mb-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                      <div className="text-muted-foreground flex items-center gap-2">
                        <MapPin size={16} />
                        {`${talent?.location?.country},${talent?.location?.state || ""}`}
                      </div>
                      <div className="text-muted-foreground flex items-center gap-2">
                        <Briefcase size={16} />
                        {/* {talent?.experience} */}experience
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {talent.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-secondary/50 text-secondary-foreground rounded-full px-2 py-1 text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT — Rating + View Profile */}
                <div className="flex flex-row-reverse items-center justify-between gap-3 md:flex-col md:items-end md:justify-start">
                  {/* <div className="flex items-center gap-1 text-sm font-semibold">
                    <Star size={16} className="fill-yellow-500 text-yellow-500" />
                    {talent.rating}
                  </div> */}

                  <Button size="sm">View Profile</Button>
                </div>
              </div>
            </Card>
          </Link>
        ))
      )}
    </div>
  );
}
