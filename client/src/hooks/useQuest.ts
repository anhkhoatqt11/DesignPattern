import { getRequest, postRequest } from "@/lib/fetch";
import toast from "react-hot-toast";

export const useQuest = () => {
  const updateQuestLog = async (questId, userInfo) => {
    try {
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
    } catch (error) {
      console.error("Error updating quest log:", error);
      throw error;
    }
  };
  const getDailyQuests = async () => {
    const res = await getRequest({
      endPoint: "https://skylark-entertainment.vercel.app/api/quest/getDailyQuests",
    });
    return res;
  };
  const updateLoginLog = async (userInfo) => {
    const res = await postRequest({
      endPoint: `https://skylark-entertainment.vercel.app/api/quest/updateLoginLog`,
      isFormData: false,
      formData: userInfo,
    });
    return res;
  };
  return {
    updateQuestLog,
    getDailyQuests,
    updateLoginLog,
  };
};
