import { Clock, CheckCircle, XCircle, DollarSign, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { applications } from "@/constants/data";

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "text-yellow-600";
    case "accepted":
      return "text-green-600";
    case "rejected":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock size={16} />;
    case "accepted":
      return <CheckCircle size={16} />;
    case "rejected":
      return <XCircle size={16} />;
    default:
      return null;
  }
};

const CandidateApplicationPage = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold">Applied Jobs</h2>

      {applications.map((app) => (
        <Card key={app.id} className="mt-4 p-6 transition-shadow hover:shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-3">
                <h3 className="text-lg font-semibold">{app.position}</h3>
              </div>
              <p className="text-muted-foreground mb-3">{app.company}</p>
              <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-3">
                <div className="text-muted-foreground flex items-center gap-2">
                  <MapPin size={16} />
                  {app.location}
                </div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <DollarSign size={16} />
                  {app.salary}
                </div>
                <div className="text-muted-foreground">Applied {app.appliedDate}</div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className={`flex items-center gap-1 text-sm font-semibold ${getStatusColor(app.status)}`}>
                {getStatusIcon(app.status)}
                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </div>
              <Button variant="outline">View Job</Button>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
};
export default CandidateApplicationPage;
