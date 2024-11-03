import { getRequest, postRequest } from "@/lib/fetch";
import toast from "react-hot-toast";

export const useDonate = () => {
  const getDonatePackageList = async () => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/donates/getDonatePackageList`,
    });
    return res;
  };

  return {
    getDonatePackageList,
  };
};
