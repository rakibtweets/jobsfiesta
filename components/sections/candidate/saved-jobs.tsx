import { SavedJobTable } from "@/components/tables/save-job-table";
import { savedColumns } from "@/components/tables/saved-job-columns";
import { IJob } from "@/database/job.model";
// import { savedJobs } from "@/constants/data";
import { getSavedJobsCandidateId } from "@/lib/actions/candidate.action";

interface IProps {
  candidateId?: string;
}
type SavedJobWithCandidate = IJob & {
  candidateId: string;
};
const SavedJobs = async ({ candidateId }: IProps) => {
  const { data } = await getSavedJobsCandidateId(candidateId as string);
  const jobs = data?.jobs || [];
  console.log("🚀 ~ SavedJobs ~ jobs:", jobs);
  const formattedJobs = jobs.map((job) => {
    return {
      ...job,
      candidateId: candidateId,
    };
  }) as SavedJobWithCandidate[];
  return (
    <div>
      <SavedJobTable columns={savedColumns} data={formattedJobs} />
    </div>
  );
};
export default SavedJobs;
