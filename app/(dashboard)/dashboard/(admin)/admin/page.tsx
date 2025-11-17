import { AnalyticsCard } from "@/components/dashboard/analytics-card";
import { DailyJoinsChart } from "@/components/dashboard/daily-joins-cart";

const AdminDashboardPage = () => {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-foreground mb-2 text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Track your job portal metrics and analytics</p>
      </div>

      {/* Analytics Cards */}
      <AnalyticsCard />

      {/* Charts Section */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DailyJoinsChart type="bar" />
        <DailyJoinsChart type="line" />
      </div>
    </>
  );
};
export default AdminDashboardPage;
