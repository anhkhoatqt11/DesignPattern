import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Leaderboard = ({ challengePoints }) => {
  // Process and sort the challengePoints
  const sortedPoints = challengePoints
    .map((user) => ({
      ...user,
      highestPoint:
        user.point.length > 0
          ? Math.max(...user.point.map((p) => p.point)) // Get the highest point
          : 0, // Default to 0 if no points exist
    }))
    .sort((a, b) => b.highestPoint - a.highestPoint); // Sort by highest point

  // Extract top 3 (or fallback placeholders if fewer than 3 users)
  const topThree = [
    sortedPoints[0] || {
      name: "Chưa có",
      avatar: "/placeholder.svg",
      highestPoint: 0,
    },
    sortedPoints[1] || {
      name: "Chưa có",
      avatar: "/placeholder.svg",
      highestPoint: 0,
    },
    sortedPoints[2] || {
      name: "Chưa có",
      avatar: "/placeholder.svg",
      highestPoint: 0,
    },
  ];

  // Colors and styles for ranks
  const ranks = [
    {
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/20",
      borderColor: "border-yellow-500",
    },
    {
      color: "text-silver",
      bgColor: "bg-silver/20",
      borderColor: "border-silver",
    },
    {
      color: "text-bronze",
      bgColor: "bg-bronze/20",
      borderColor: "border-bronze",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 items-end mb-6">
        {/* Second Place */}
        <div className="flex flex-col items-center">
          <div className="relative mb-3">
            <img className="w-28 h-28" src="/flowerring2.png"></img>
            <Avatar
              className={`absolute top-4 left-[13px] w-[86px] h-[86px] mb-2`}
            >
              <AvatarImage src={topThree[1].avatar} alt={topThree[1].name} />
              <AvatarFallback>{topThree[1].name?.[0] || "--"}</AvatarFallback>
            </Avatar>
          </div>
          <img className="w-20 h-20" src="/silvertrophy.png"></img>
          <div className="flex flex-col justify-start items-center bg-[#2A2A2A] h-40 w-full p-3">
            <span className="font-extrabold text-[36px] text-[#FF9417]">2</span>
            <p className="font-semibold text-center">{topThree[1].name}</p>
            <span className="text-red-500 font-medium">
              {topThree[1].highestPoint || "--"}
            </span>
          </div>
        </div>

        {/* First Place */}
        <div className="flex flex-col items-center">
          <div className="relative mb-3">
            <img className="w-[134px] h-[134px]" src="/flowerring1.png"></img>
            <Avatar className={`absolute top-4 left-6 w-[86px] h-[86px] mb-2`}>
              <AvatarImage src={topThree[0].avatar} alt={topThree[1].name} />
              <AvatarFallback>{topThree[0].name?.[0] || "--"}</AvatarFallback>
            </Avatar>
          </div>

          <img className="w-20 h-20" src="/goldtrophy.png"></img>
          <div className="flex flex-col justify-start items-center bg-[#2A2A2A] h-44 w-full p-3">
            <span className="font-extrabold text-[36px] text-[#EF476F]">1</span>
            <p className="font-semibold text-center">{topThree[0].name}</p>
            <span className="text-red-500 font-medium">
              {topThree[0].highestPoint || "--"}
            </span>
          </div>
        </div>

        {/* Third Place */}
        <div className="flex flex-col items-center">
          <div className="relative mb-3">
            <img className="w-[104px] h-24" src="/flowerring3.png"></img>
            <Avatar
              className={`absolute top-1 left-2.5 w-[86px] h-[86px] mb-2`}
            >
              <AvatarImage src={topThree[2].avatar} alt={topThree[1].name} />
              <AvatarFallback>{topThree[2].name?.[2] || "--"}</AvatarFallback>
            </Avatar>
          </div>
          <img className="w-20 h-20" src="/trophy.png"></img>
          <div className="flex flex-col justify-start items-center bg-[#2A2A2A] h-32 w-full p-3">
            <span className="font-extrabold text-[36px] text-[#06D6A0]">3</span>
            <p className="font-semibold text-center">{topThree[2].name}</p>
            <span className="text-red-500 font-medium">
              {topThree[2].highestPoint || "--"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
