import FeaturedJobs from "@/components/home/featured-jobs";
import HeroBanner from "@/components/home/hero-banner";
import Services from "@/components/home/services";

export const metadata = {
  title: "Jobsfiesta - Find Your Dream Job",
  description: "Connect with top employers and find your perfect job opportunity",
};

export default function Home() {
  const a = false;

  return (
    <>
      <HeroBanner />
      <Services />
      <FeaturedJobs />
    </>
  );
}
