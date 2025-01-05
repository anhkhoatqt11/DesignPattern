import { getRequest, postRequest, putRequest } from "@/lib/fetch";
import { baseApiUrl } from "@/lib/utils";

export const useChallenge = () => {
  const getUsersChallengesPoint = async () => {
    const res = await getRequest({
      endPoint: `${baseApiUrl}/api/challenges/getUsersChallengesPoint`,
    });
    return res;
  };

  const getChallengeInformation = async () => {
    const res = await getRequest({
      endPoint: `${baseApiUrl}/api/challenges/getChallengeInformation`,
    });
    return res;
  };

  const uploadChallengesPoint = async (data) => {
    const res = await postRequest({
      endPoint: `${baseApiUrl}/api/challenges/uploadUsersChallengesPoint`,
      isFormData: false,
      formData: data,
    });
    return res;
  };

  return {
    getUsersChallengesPoint,
    getChallengeInformation,
    uploadChallengesPoint,
  };
};
