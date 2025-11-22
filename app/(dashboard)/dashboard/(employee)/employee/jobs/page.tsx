import { Suspense } from "react";

import EmployeeJobs from "@/components/employee/sections/employe-job";
import JobListSkeleton from "@/components/skeletons/job-list-skeleton";

const EmployeeJobsPage = async () => {
  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold">All Posted Jobs</h1>
      <Suspense fallback={<JobListSkeleton />}>
        <EmployeeJobs />
      </Suspense>
    </>
  );
};

export default EmployeeJobsPage;
