import { getRequest, postRequest, putRequest } from "@/lib/fetch";


export const useChallenge =  () => {
    const getUsersChallengesPoint = async () => {
        const res = await getRequest({
            endPoint: "https://skylark-entertainment.vercel.app/api/challenges/getUsersChallengesPoint",
        });
        return res;
    }

    const getDailyQuests = async () => {
        const res = await getRequest({
            endPoint: "https://skylark-entertainment.vercel.app/api/quest/getDailyQuests",
        });
        return res;
    };

    return {
        getUsersChallengesPoint,
    }
}