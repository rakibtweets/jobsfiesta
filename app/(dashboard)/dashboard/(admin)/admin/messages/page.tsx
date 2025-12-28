import { redirect } from "next/navigation";
import { Suspense } from "react";

import AdminMessages from "@/components/sections/admin/admin-messages";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import { User } from "@/lib/auth";
import { getServerSession } from "@/lib/get-session";

const AdminMessagesPage = async () => {
  const me = await getServerSession();
  const user = me?.user as User;

  const isAdmin = user?.role === "admin";
  if (!isAdmin) {
    redirect("/unauthorized");
  }

  return (
    <>
      <h2 className="text-2xl font-semibold">Get All Messages</h2>
      <Suspense fallback={<TableSkeleton />}>
        <AdminMessages />
      </Suspense>
    </>
  );
};
export default AdminMessagesPage;
