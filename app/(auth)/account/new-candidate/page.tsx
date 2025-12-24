/* eslint-disable @typescript-eslint/ban-ts-comment */
import { redirect } from "next/navigation";

import { CandidateProfileForm } from "@/components/forms/candidate/candidate-profile-form";
import { User } from "@/lib/auth";
import { getServerSession } from "@/lib/get-session";

const CreateNewCandidatePage = async () => {
  const me = await getServerSession();
  const user = me?.user as User;
  //@ts-ignore
  if (me?.user?.candidate || me?.user?.employee) {
    redirect("/");
  }

  return (
    <section className="mx-auto min-h-screen w-full max-w-lg p-7">
      <div className="flex flex-col items-center justify-center gap-6">
        <h2 className="text-center text-2xl font-semibold">Create candidate profile to find your dream job</h2>
        <>
          <CandidateProfileForm
            name={user.name}
            email={user.email}
            userMongoId={user.id}
            //@ts-ignore
            accountType={"candidate"}
            formType="create"
            onBoarding
          />
        </>
      </div>
    </section>
  );
};
export default CreateNewCandidatePage;
