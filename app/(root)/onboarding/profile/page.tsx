import { CandidateProfileForm } from "@/components/forms/candidate/candidate-profile-form";
import { EmployeeProfileForm } from "@/components/forms/employee/employee-profile-form";
import { getServerSession } from "@/lib/get-session";

const ProfileOnBoardingPage = async () => {
  const me = await getServerSession();

  return (
    <section className="min-h-screen p-7">
      <div className="flex flex-col items-center justify-center gap-6">
        <h2 className="text-center text-2xl font-semibold">
          Complete your{" "}
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            me?.user?.accountType
          }{" "}
          profile
        </h2>
        <>
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            me?.user?.accountType === "candidate" && (
              <CandidateProfileForm
                name={me.user.name}
                email={me.user.email}
                userMongoId={me.user.id}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                accountType={me?.user?.accountType}
                formType="create"
                onBoarding
              />
            )
          }

          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            me?.user?.accountType === "employee" && (
              <EmployeeProfileForm
                name={me.user.name}
                email={me.user.email}
                userMongoId={me.user.id}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                accountType={me?.user?.accountType}
                // formType="create"
                onBoarding
              />
            )
          }
        </>
      </div>
    </section>
  );
};
export default ProfileOnBoardingPage;
