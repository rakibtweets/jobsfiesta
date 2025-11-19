import { CandidateProfileForm } from "@/components/forms/candidate/candidate-profile-form";
import { getServerSession } from "@/lib/get-session";

const ProfileOnBoardingPage = async () => {
  const me = await getServerSession();
  console.log("🚀 ~ ProfileOnBoardingPage ~ me:", me);

  return (
    <section className="min-h-screen p-7">
      <div className="flex flex-col items-center justify-center gap-6">
        <h2 className="text-center text-2xl font-semibold">Complete Your Choosen profile</h2>
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
              onBoarding
            />
          )
        }
      </div>
    </section>
  );
};
export default ProfileOnBoardingPage;
