import JobForm from "@/components/forms/employee/employee-job-form";

const EmployeeJobPostPage = () => {
  return (
    <>
      <h2 className="mb-6 text-2xl font-bold">Post a New Job</h2>
      {/* Job Form */}
      <JobForm formType="create" />
    </>
  );
};
export default EmployeeJobPostPage;
