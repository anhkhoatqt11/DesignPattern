import { getRequest, postRequest, putRequest } from "@/lib/fetch";


export const useChallenge =  () => {
    const getUsersChallengesPoint = async () => {
        const res = await getRequest({
            endPoint: "https://skylark-entertainment.vercel.app/api/challenges/getUsersChallengesPoint",
        });
        return res;
    }

    const getChallengeInformation = async () => {
        const res = await getRequest({
            endPoint: "https://skylark-entertainment.vercel.app/api/challenges/getChallengeInformation"
        })
        return res;
    }

    const uploadChallengesPoint = async (data) => {
        const res = await postRequest({
            endPoint: "https://skylark-entertainment.vercel.app/api/challenges/uploadUsersChallengesPoint",
            isFormData: false,
            formData: data
        })
        return res;
    }

    return {
        getUsersChallengesPoint,
        getChallengeInformation,
        uploadChallengesPoint
    }
}