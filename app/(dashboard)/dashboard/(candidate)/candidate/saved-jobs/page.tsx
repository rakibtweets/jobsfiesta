import { MapPin, DollarSign } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { savedJobs } from "@/constants/data";

const CandiateSaveJobsPage = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold">Saved Jobs</h2>
      {savedJobs.map((job) => (
        <Card key={job.id} className="mt-4 p-6 transition-shadow hover:shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-semibold">{job.position}</h3>
              <p className="text-muted-foreground mb-3">{job.company}</p>
              <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-3">
                <div className="text-muted-foreground flex items-center gap-2">
                  <MapPin size={16} />
                  {job.location}
                </div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <DollarSign size={16} />
                  {job.salary}
                </div>
                <div className="text-muted-foreground">Saved {job.savedDate}</div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button>Apply Now</Button>
              <Button variant="destructive">Remove</Button>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
};
export default CandiateSaveJobsPage;
