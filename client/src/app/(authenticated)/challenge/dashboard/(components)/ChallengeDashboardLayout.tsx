"use client";

import React, { useEffect, useState } from "react";
import { Trophy, Home, Book, Film, Star, User, Hourglass } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import DailyMission from "./DailyMission";
import Leaderboard from "./Leaderboard";
import { useChallenge } from "@/hooks/useChallenge";
import { useQuest } from "@/hooks/useQuest";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import DailyQuest from "./DailyQuest";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const ChallengeDashboardLayout = ({ session }) => {
  const { getUsersChallengesPoint, getChallengeInformation } = useChallenge();
  const { updateLoginLog, getDailyQuests, updateQuestLog } = useQuest();
  const [currentDateTime, setCurrentDateTime] = React.useState(new Date());
  const { getUserCoinAndChallenge } = useUser();
  const [loginGift, setLoginGift] = useState(0);
  const router = useRouter();

  const {
    data: userCoinAndQCData,
    isLoading: isUserCoinAndQCDataLoading,
    refetch: refetchUserCoinAndQCData,
  } = useQuery({
    queryKey: ["user", "coinAndQCData", session?.user?.id],
    queryFn: async () => {
      const res = await getUserCoinAndChallenge(session?.user?.id);
      return res;
    },
  });

  const { data: challengePoints, isLoading } = useQuery({
    queryKey: ["challenge", "points"],
    queryFn: async () => {
      const res = await getUsersChallengesPoint();
      return res;
    },
  });

  const { data: dailyQuests, isLoading: isDailyQuestsLoading } = useQuery({
    queryKey: ["daily", "quests"],
    queryFn: async () => {
      const res = await getDailyQuests();
      (res || []).forEach((item) => {
        if (item?.questType === "login") {
          setLoginGift(item?.prize);
        }
      });
      console.log(res);
      return res;
    },
  });

  const {
    data: challengeInformation,
    isLoading: isChallengeInformationLoading,
  } = useQuery({
    queryKey: ["challenge", "information"],
    queryFn: async () => {
      const res = await getChallengeInformation();
      console.log(res);
      return res;
    },
  });

  useEffect(() => {
    const fetchDateTime = async () => {
      try {
        const response = await fetch(
          "https://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh"
        );
        const data = await response.json();
        console.log(data.datetime);
        setCurrentDateTime(new Date(data.datetime));
      } catch (error) {
        console.error("Error fetching date and time:", error);
      }
    };
    console.log(session);
    fetchDateTime();
  }, []);

  if (
    isLoading ||
    isDailyQuestsLoading ||
    isUserCoinAndQCDataLoading ||
    isChallengeInformationLoading
  ) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen">
      <div className="min-h-screen text-white">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Challenge Info, Podium, and Results (on top for smaller screens) */}

            <div className="w-full lg:w-1/2 space-y-8 order-2">
              <DailyMission
                currentDateTime={currentDateTime}
                hasReceivedDailyGift={
                  userCoinAndQCData?.questLog?.hasReceivedDailyGift
                }
                updateLoginLog={updateLoginLog}
                userId={session?.user?.id}
                refetchUserCoinAndQCData={refetchUserCoinAndQCData}
                loginGift={loginGift}
              />

              <DailyQuest
                dailyQuests={dailyQuests}
                questLog={userCoinAndQCData?.questLog}
                updateQuestLog={updateQuestLog}
                userId={session?.user?.id}
                refetchUserCoinAndQCData={refetchUserCoinAndQCData}
              />
            </div>
            <div className="w-full lg:w-1/2 space-y-8 order-1">
              {/* Header */}
              <div className="flex flex-col text-center lg:text-left">
                <h1 className="text-2xl font-semibold mb-1">Thử thách</h1>
                <p className="text-[#DA5EF0] font-medium text-lg mb-2">
                  {challengeInformation?.challengeName}
                </p>
                {challengeInformation?.endTime && (
                  <div className="flex items-center justify-center lg:justify-start">
                    {currentDateTime <
                    new Date(challengeInformation.endTime) ? (
                      <p className="text-[#A958FE] text-base flex flex-row items-center">
                        <Hourglass className="mr-1 w-4 h-4" />
                        Thời gian còn lại:{" "}
                        {Math.max(
                          0,
                          Math.floor(
                            (new Date(challengeInformation.endTime).getTime() -
                              currentDateTime.getTime()) /
                              (1000 * 60 * 60 * 24)
                          )
                        )}{" "}
                        ngày{" "}
                        {Math.max(
                          0,
                          Math.floor(
                            (new Date(challengeInformation.endTime).getTime() -
                              currentDateTime.getTime()) /
                              (1000 * 60 * 60)
                          ) % 24
                        )}{" "}
                        giờ{" "}
                        {Math.max(
                          0,
                          Math.floor(
                            (new Date(challengeInformation.endTime).getTime() -
                              currentDateTime.getTime()) /
                              (1000 * 60)
                          ) % 60
                        )}{" "}
                        phút
                      </p>
                    ) : (
                      <p className="text-red-400 text-base flex flex-row text-red-500 items-center">
                        <Hourglass className="mr-1 w-4 h-4 text-red-500" />
                        Thời gian thử thách đã kết thúc
                      </p>
                    )}
                  </div>
                )}
              </div>

              <Leaderboard challengePoints={challengePoints} />

              {/* Challenge Results */}
              <div className="w-full flex flex-row justify-between items-center">
                <span className="text-xl font-semibold text-white">
                  {challengePoints?.find(
                    (user) => user.userId === session?.user?.id
                  )?.point.length !== 0
                    ? "Chưa vượt thử thách"
                    : "Kết quả thử thách"}
                </span>
                {challengePoints?.find(
                  (user) => user.userId === session?.user?.id
                )?.point.length !== 0 ? (
                  <p className="text-2xl font-medium text-[#A958FE]">
                    {challengePoints
                      ?.find((user) => user.userId === session?.user?.id)
                      ?.point.reduce((acc, curr) => acc + curr.point, 0) ||
                      0}{" "}
                    điểm
                  </p>
                ) : (
                  <div className="flex justify-center">
                    <Button
                      className="text-white text-base rounded-full h-[30px] w-[100px] font-medium transition-colors transition-transform transition-shadow transition-all duration-500 bg-left hover:bg-right hover:shadow-[#A958FE] hover:shadow-md data-[hover=true]:opacity-100"
                      onClick={() => router.push("/challenge/ingame")}
                      style={{
                        backgroundSize: "200% auto",
                        backgroundImage:
                          "var(--button_primary_background_color, linear-gradient(90deg, #A958FE, #DA5EF0 50%, #A958FE))",
                      }}
                    >
                      Chơi ngay
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDashboardLayout;
