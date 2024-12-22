import { getRequest } from "@/lib/fetch";


export const usePayment = () => {
    const getPaymentHistoriesByUserId = async (userId) => {
        const res = await getRequest({
            endPoint: `https://skylark-entertainment.vercel.app/api/payment/getPaymentHistoriesByUserId?userId=${userId}`,
        });
        return res;
    }

    return {
        getPaymentHistoriesByUserId
    }
}