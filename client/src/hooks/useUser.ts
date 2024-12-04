import { getRequest, postRequest, putRequest } from "@/lib/fetch";
import toast from "react-hot-toast";

export const useUser = () => {
  const getPaymentHistories = async (userId) => {
    const res = await getRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/users/getPaymentHistories?userId=${userId}`,
    });
    return res;
  };

  const paySkycoin = async (userId, coin, chapterId) => {
    const res = await putRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/users/paySkycoin`,
      isFormData: false,
      formData: {
        userId,
        coin,
        chapterId,
      },
    });
    return res;
  };

  const fetchUserInfoById = async (id) => {
    const res = await getRequest({
      endPoint: `/api/user?id=${id}`,
    });
    console.log(res);
    return res;
  };

  const updateUserInfo = async (data) => {
    try {
      const res = await postRequest({
        endPoint: "/api/admin/users/update",
        isFormData: false,
        formData: data,
      });
      toast.success("Thông tin hồ sơ đã được lưu");
      return res;
    } catch (e) {
      console.log(e);
      toast.error("Cập nhật thông tin thất bại");
      return false;
    }
  };
  const uploadUserInfo1 = async (data) => {
    try {
      const res = await postRequest({
        endPoint: "/api/user/update-information",
        isFormData: false,
        formData: data,
      });
      toast.success("Thông tin hồ sơ đã được lưu");
    } catch (e) {
      console.log(e);
    }
  };

  return {
    getPaymentHistories,
    paySkycoin,
    fetchUserInfoById,
    updateUserInfo,
    uploadUserInfo1,
  };
};
