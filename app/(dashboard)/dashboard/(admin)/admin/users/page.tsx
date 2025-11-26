import AdminUsers from "@/components/sections/admin/admin-users";
import { getAllUsers } from "@/lib/actions/admin.action";
import { User } from "@/lib/auth";
export default async function UsersPage() {
  const { data } = await getAllUsers();
  // console.log("🚀 ~ UsersPage ~ data:", data);
  return (
    <main className="p-8">
      <AdminUsers users={data?.users as User[]} />
    </main>
  );
}
