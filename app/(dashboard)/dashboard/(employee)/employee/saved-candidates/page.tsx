import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const candidates = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Senior Product Designer",
    rating: 4.8,
    experience: "5+ years",
    status: "reviewing",
  },
  {
    id: 2,
    name: "Alex Chen",
    position: "Full Stack Developer",
    rating: 4.9,
    experience: "3 years",
    status: "shortlisted",
  },
  {
    id: 3,
    name: "Emma Martinez",
    position: "Data Scientist",
    rating: 4.7,
    experience: "6 years",
    status: "rejected",
  },
];

const EmployeeSavedPostsPage = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold">Saved Candiates</h2>
      {candidates.map((candidate) => (
        <Card key={candidate.id} className="mt-4 p-6 transition-shadow hover:shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-semibold">{candidate.name}</h3>
              <p className="text-muted-foreground mb-3">{candidate.position}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="text-muted-foreground">⭐ {candidate.rating}</div>
                <div className="text-muted-foreground">{candidate.experience}</div>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    candidate.status === "shortlisted"
                      ? "bg-green-100 text-green-800"
                      : candidate.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {candidate.status}
                </span>
              </div>
            </div>
            <Button>View Profile</Button>
          </div>
        </Card>
      ))}
    </>
  );
};
export default EmployeeSavedPostsPage;
