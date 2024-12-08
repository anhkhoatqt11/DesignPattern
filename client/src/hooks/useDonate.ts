import { getRequest, postRequest } from "@/lib/fetch";
import toast from "react-hot-toast";

export const useDonate = () => {
  const getDonatePackageList = async () => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/donates/getDonatePackageList`,
    });
    return res;
  };

  const getDonatePackageDetail = async (packageId) => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/donates/getDonatePackageDetail?packageId=${packageId}`,
    });
    return res;
  };

  const getDonatorList = async () => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/donates/getDonatorList`,
    });
    return res;
  };

  const uploadDonateRecord = async (packageId, userId) => {
    const res = await postRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/donates/uploadDonateRecord`,
      isFormData: false,
      formData: {
        packageId,
        userId,
        datetime: new Date().toISOString(),
      },
    });
    return res;
  };

  const processDonationPayment = async (amount, userId) => {
    const res = await postRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/donates/processDonationPayment`,
      isFormData: false,
      formData: {
        amount,
        userId,
      },
    });
    return res;
  };

  return {
    getDonatePackageList,
    getDonatePackageDetail,
    getDonatorList,
    uploadDonateRecord,
    processDonationPayment,
  };
};
