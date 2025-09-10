import { getOrderSummary } from "../actions/order.actions";
import AdminDashboard from "./_components/dashboard";

const page = async () => {
  const summary = await getOrderSummary();
  console.log("summary", summary);

  return <AdminDashboard summary={summary} />;
};

export default page;
