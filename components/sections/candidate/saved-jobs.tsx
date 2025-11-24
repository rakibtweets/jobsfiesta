import { SavedJobTable } from "@/components/tables/save-job-table";
import { savedColumns } from "@/components/tables/saved-job-columns";
// import { savedJobs } from "@/constants/data";
import { getSavedJobsCandidateId } from "@/lib/actions/candidate.action";

interface IProps {
  candidateId?: string;
}
const SavedJobs = async ({ candidateId }: IProps) => {
  const { data } = await getSavedJobsCandidateId(candidateId as string);
  const jobs = data?.jobs || [];
  console.log("🚀 ~ SavedJobs ~ jobs:", jobs);
  return (
    <div>
      <SavedJobTable columns={savedColumns} data={jobs} />
    </div>
  );
};
export default SavedJobs;
