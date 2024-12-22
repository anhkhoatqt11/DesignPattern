import React from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Image } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/modal";
import { ReceivedCoinDialog } from "@/components/receivedCoinDialog";

const DailyQuest = ({
  dailyQuests,
  questLog,
  updateQuestLog,
  userId,
  refetchUserCoinAndQCData,
}) => {
  const [message, setMessage] = React.useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleClaimQuest = async (quest) => {
    const userInfo = {
      id: userId, // Replace with actual user ID
      questLog,
    };
    try {
      setMessage(`Đã '${quest.questName}'. Nhận ngay ${quest.prize} skycoin.`);
      onOpen();
      await updateQuestLog(quest._id, userInfo);
      refetchUserCoinAndQCData();
    } catch (error) {
      console.error("Error claiming quest:", error);
      toast.error("Không thể nhận quà");
    }
  };

  return (
    <>
      <div className="space-y-6 rounded-lg shadow-lg">
        <div className="space-y-4">
          {dailyQuests.map((quest) => {
            if (quest.questType === "login") return;
            const isReadingQuest = quest.questType === "reading";
            const isWatchingQuest = quest.questType === "watching";

            const userProgress = isReadingQuest
              ? questLog.readingTime
              : isWatchingQuest
              ? questLog.watchingTime
              : 0;

            const isCompleted = userProgress >= quest.requiredTime;
            const hasReceived = questLog.received.some(
              (id) => id.$oid === quest._id
            );

            const progressPercentage = Math.round(
              Math.min((userProgress / quest.requiredTime) * 100, 100)
            );

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
                className="p-3 px-5 bg-neutral-800 rounded-lg flex flex-col shadow-md space-y-2"
              >
                <div>
                  <div className="flex flex-row w-full justify-between items-center">
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {quest.questName}
                    </h3>
                    <CircularProgress
                      classNames={{
                        indicator: "stroke-[#A958FE]",
                        track: "stroke-white/10",
                      }}
                      aria-label="Loading..."
                      color="success"
                      showValueLabel={true}
                      size="lg"
                      value={progressPercentage}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-row justify-between items-end">
                  <p className="text-sm text-gray-400 mb-2">
                    <div className="flex flex-row gap-1 items-end">
                      <Image
                        src="/skycoin.png"
                        alt="star"
                        width={40}
                        height={40}
                      />
                      <span className="text-yellow-400 text-lg font-medium">
                        x{quest.prize}
                      </span>
                    </div>
                  </p>
                  <Button
                    className="py-0 px-3"
                    disabled={isDisabled}
                    onClick={() => handleClaimQuest(quest)}
                  >
                    {buttonText}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ReceivedCoinDialog
        message={message}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

export default DailyQuest;
