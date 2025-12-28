import { adminMessageColumns } from "@/components/tables/admin-message-table/admin-message-column";
import { AdminMessagesTable } from "@/components/tables/admin-message-table/admin-message-table";
import { getAllContactsMessages } from "@/lib/actions/contact.action";
// import { savedJobs } from "@/constants/data";

const AdminMessages = async () => {
  const { data } = await getAllContactsMessages();
  console.log("🚀 ~ AdminMessages ~ data:", data);

  return (
    <>
      <AdminMessagesTable columns={adminMessageColumns} data={data?.contacts || []} />
    </>
  );
};
export default AdminMessages;
