import React from "react";
import { Button } from "@/components/ui/button";
import toast from 'react-hot-toast'


const DailyQuest = ({ dailyQuests, questLog, updateQuestLog, userId, refetchUserCoinAndQCData }) => {
    const handleClaimQuest = async (quest) => {
        const userInfo = {
            id: userId, // Replace with actual user ID
            questLog,
        };
        try {
            console.log(quest._id, userInfo);
            await updateQuestLog(quest._id, userInfo);
            toast.success("Đã nhận quà hoàn thành nhiệm vụ");
            refetchUserCoinAndQCData();
        } catch (error) {
            console.error("Error claiming quest:", error);
            toast.error("Không thể nhận quà");
        }
    };

    return (
        <div className="space-y-6 rounded-lg shadow-lg">
            <div className="space-y-4">
                {dailyQuests.map((quest) => {
                    const isReadingQuest = quest.questType === "reading";
                    const isWatchingQuest = quest.questType === "watching";

                    const userProgress = isReadingQuest
                        ? questLog.readingTime
                        : isWatchingQuest
                            ? questLog.watchingTime
                            : 0;

                    const isCompleted = userProgress >= quest.requiredTime;
                    const hasReceived = questLog.received.some((id) => id.$oid === quest._id);

                    const progressPercentage = Math.min(
                        (userProgress / quest.requiredTime) * 100,
                        100
                    ).toFixed(0);

                    let buttonText = "Nhận";
                    let isDisabled = false;

                    if (hasReceived) {
                        buttonText = "Đã nhận";
                        isDisabled = true;
                    } else if (!isCompleted) {
                        buttonText = "Chưa hoàn thành";
                        isDisabled = true;
                    }

                    return (
                        <div
                            key={quest._id}
                            className="p-4 bg-neutral-800 rounded-lg flex flex-col shadow-md space-y-4"
                        >
                            <div>
                                <h3 className="text-white font-semibold text-lg mb-1">{quest.questName}</h3>
                                <p className="text-sm text-gray-400 mb-2">
                                    Phần thưởng: <span className="text-yellow-400">{quest.prize} xu</span>
                                </p>
                                <p className="text-sm text-gray-400 mb-2">
                                    Yêu cầu: {quest.requiredTime > 0 ? `${quest.requiredTime} tập` : "Không yêu cầu"}
                                </p>
                                <p className="text-sm text-gray-400 mb-2">
                                    Tiến độ: {userProgress} / {quest.requiredTime} tập ({progressPercentage}%)
                                </p>
                                <div className="w-full bg-gray-600 rounded-full h-2.5 overflow-hidden">
                                    <div
                                        className="bg-green-500 h-2.5 rounded-full"
                                        style={{ width: `${progressPercentage}%` }}
                                    ></div>
                                </div>
                            </div>
                            <Button
                                className="ml-auto"
                                disabled={isDisabled}
                                onClick={() => handleClaimQuest(quest)}
                            >
                                {buttonText}
                            </Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DailyQuest;
