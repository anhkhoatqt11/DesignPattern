import DonateDetail from "./(components)/DonateDetail";
import { getSession } from "@/lib/auth";
const page = async ({ params }) => {
  const session = await getSession();
  return <DonateDetail params={params} session={undefined} />;
};

export default page;
