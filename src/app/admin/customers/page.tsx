import { getAllUsers } from "@/app/actions/user.actions";
import { requireAdmin } from "@/services/auth-guard";
import CustomersPage from "./_components/customers";

const page = async (props: {
  searchParams: Promise<{
    page: string;
    query: string;
  }>;
}) => {
  await requireAdmin();

  const { page = "1", query: searchText = "" } = await props.searchParams;

  const users = await getAllUsers({ page: Number(page), query: searchText });
  console.log("users", users);

  return (
    <CustomersPage
      users={users.data}
      totalPages={users.totalPages}
      currentPage={Number(page)}
      searchQuery={searchText}
    />
  );
};

export default page;
