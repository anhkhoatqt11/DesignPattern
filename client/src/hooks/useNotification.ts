import { getRequest, postRequest, putRequest } from "@/lib/fetch";
import toast from "react-hot-toast";

export const useNotification = () => {
  const sendPushNoti = async (userId) => {
    const res = await postRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/users/sendPushNoti`,
      isFormData: false,
      formData: {
        title: "Ai đó đã trả lời bình luận của bạn",
        body: "Hãy kiểm tra ngay",
        userId: userId,
      },
    });
    return res;
  };

  const addCommentNotiToUser = async (userId, sourceId, type) => {
    const res = await postRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/users/addCommentNotification`,
      isFormData: false,
      formData: {
        userId: userId,
        sourceId: sourceId,
        type: type,
        content: "Ai đó đã trả lời bình luận của bạn",
      },
    });
    return res;
  };

  return {
    sendPushNoti,
    addCommentNotiToUser,
  };
};
