/* eslint-disable @typescript-eslint/ban-ts-comment */
import { redirect } from "next/navigation";

import EmployeeProfileInfo from "@/components/employee/sections/employee-profile-info";
import { getEmployeeById } from "@/lib/actions/employee.action";
import { getServerSession } from "@/lib/get-session";

// Dummy Employee Data
async function getDummyEmployee() {
  return {
    name: "John Doe",
    email: "john.doe@techcorp.com",
    companyName: "Tech Corp Solutions",
    companySize: "150-300",
    country: "United States",
    industry: "Software & IT",
    about: "We specialize in enterprise software, cloud engineering, and AI-driven solutions.",
    companyLogo: {
      url: "", // leave empty to show fallback avatar
    },
  };
}

export default async function EmployeeProfilePage() {
  // const employee = await getDummyEmployee();

  const me = await getServerSession();
  console.log("🚀 ~ EmployeeProfilePage ~ me:", me);

  if (!me?.session) redirect("/auth/sign-in");

  //@ts-ignore

  //@ts-ignore
  const employeeId = me?.user?.employee as string;

  const { data } = await getEmployeeById(employeeId);

  return (
    <section className="space-y-8">
      {/* Display Employee Info */}
      <EmployeeProfileInfo employee={data?.employee} />

      {/* Update Form */}
      {/* <EmployeeProfileForm employee={employee} /> */}
    </section>
  );
}
