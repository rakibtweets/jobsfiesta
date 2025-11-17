import { MapPin, DollarSign, Users, Eye, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const postedJobs = [
  {
    id: 1,
    title: "Senior Product Designer",
    location: "San Francisco, CA",
    salary: "$120k - $150k",
    applications: 24,
    views: 312,
    posted: "2 weeks ago",
    status: "active",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    location: "New York, NY",
    salary: "$100k - $130k",
    applications: 18,
    views: 245,
    posted: "1 month ago",
    status: "active",
  },
  {
    id: 3,
    title: "Data Scientist",
    location: "Remote",
    salary: "$110k - $140k",
    applications: 12,
    views: 189,
    posted: "3 weeks ago",
    status: "closed",
  },
];
const EmployeeJobsPage = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold">All Posted Jobs</h1>

      {postedJobs.map((job) => (
        <Card key={job.id} className="mt-4 p-6 transition-shadow hover:shadow-lg">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-3">
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    job.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {job.status}
                </span>
              </div>
              <p className="text-muted-foreground mb-3">Posted {job.posted}</p>
              <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-4">
                <div className="text-muted-foreground flex items-center gap-2">
                  <MapPin size={16} />
                  {job.location}
                </div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <DollarSign size={16} />
                  {job.salary}
                </div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <Users size={16} />
                  {job.applications} Applications
                </div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <Eye size={16} />
                  {job.views} Views
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm">Manage</Button>
              <Button size="sm" variant="outline">
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
};
export default EmployeeJobsPage;
