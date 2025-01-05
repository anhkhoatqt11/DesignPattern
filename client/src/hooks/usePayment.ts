import { getRequest } from "@/lib/fetch";
import { baseApiUrl } from "@/lib/utils";

export const usePayment = () => {
  const getPaymentHistoriesByUserId = async (userId) => {
    const res = await getRequest({
      endPoint: `${baseApiUrl}/api/payment/getPaymentHistoriesByUserId?userId=${userId}`,
    });
    return res;
  };

  return {
    getPaymentHistoriesByUserId,
  };
};
