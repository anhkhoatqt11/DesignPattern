import { getRequest, postRequest } from "@/lib/fetch";
import toast from "react-hot-toast";

export const useQuest = () => {
  const updateQuestLog = async (questId, userInfo) => {
    const res = await postRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/quest/updateQuestLog`,
      isFormData: false,
      formData: {
        userId: userInfo.id,
        readingTime: userInfo.questLog.readingTime.toString(),
        watchingTime: userInfo.questLog.watchingTime.toString(),
        received: questId,
      },
    });
    return res;
  };
  return {
    updateQuestLog,
  };
};
