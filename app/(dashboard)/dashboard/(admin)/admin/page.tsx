// import { AnalyticsCard } from "@/components/dashboard/analytics-card";
import AdminDashboard from "@/components/admin/admin-dashboard";
import { getAdminDashboardStats } from "@/lib/actions/admin.action";
// import { DailyJoinsChart } from "@/components/dashboard/daily-joins-cart";

const AdminDashboardPage = async () => {
  const data = await getAdminDashboardStats();
  return (
    <>
      <AdminDashboard data={data?.data} />
    </>
  );
};
export default AdminDashboardPage;
