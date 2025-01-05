import { getRequest, postRequest } from "@/lib/fetch";
import { baseApiUrl } from "@/lib/utils";
import toast from "react-hot-toast";

export const useQuest = () => {
  const updateQuestLog = async (questId, userInfo) => {
    try {
      const res = await postRequest({
        endPoint: `${baseApiUrl}/api/quest/updateQuestLog`,
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
      endPoint: `${baseApiUrl}/api/quest/getDailyQuests`,
    });
    return res;
  };
  const updateLoginLog = async (userInfo) => {
    const res = await postRequest({
      endPoint: `${baseApiUrl}/api/quest/updateLoginLog`,
      isFormData: false,
      formData: userInfo,
    });
    return res;
  };
  const updateDailyData = async (data) => {
    const res = await postRequest({
      endPoint: "/api/quest/updateDailyData",
      isFormData: false,
      formData: data,
    });
    return res;
  };
  return {
    updateQuestLog,
    getDailyQuests,
    updateLoginLog,
    updateDailyData,
  };
};
