import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const Leaderboard = ({ challengePoints }) => {
    // Process and sort the challengePoints
    const sortedPoints = challengePoints
        .map(user => ({
            ...user,
            highestPoint: user.point.length > 0
                ? Math.max(...user.point.map(p => p.point)) // Get the highest point
                : 0, // Default to 0 if no points exist
        }))
        .sort((a, b) => b.highestPoint - a.highestPoint); // Sort by highest point

    // Extract top 3 (or fallback placeholders if fewer than 3 users)
    const topThree = [
        sortedPoints[0] || { name: "Chưa có", avatar: "/placeholder.svg", highestPoint: 0 },
        sortedPoints[1] || { name: "Chưa có", avatar: "/placeholder.svg", highestPoint: 0 },
        sortedPoints[2] || { name: "Chưa có", avatar: "/placeholder.svg", highestPoint: 0 },
    ];

    // Colors and styles for ranks
    const ranks = [
        { color: "text-yellow-500", bgColor: "bg-yellow-500/20", borderColor: "border-yellow-500" },
        { color: "text-silver", bgColor: "bg-silver/20", borderColor: "border-silver" },
        { color: "text-bronze", bgColor: "bg-bronze/20", borderColor: "border-bronze" },
    ];

    return (
        <div>
            <div className="grid grid-cols-3 gap-4 items-end mb-12">
                {/* Second Place */}
                <div className="flex flex-col items-center">
                    <Avatar className={`w-20 h-20 border-4 ${ranks[1]?.borderColor || ''} mb-2`}>
                        <AvatarImage src={topThree[1].avatar} alt={topThree[1].name} />
                        <AvatarFallback>{topThree[1].name?.[0] || "--"}</AvatarFallback>
                    </Avatar>
                    <Trophy className={`w-8 h-8 ${ranks[1]?.color || ''} mb-2`} />
                    <p className="font-semibold text-center">{topThree[1].name}</p>
                    <Badge variant="secondary" className={`mt-1 ${ranks[1]?.bgColor || ''} ${ranks[1]?.color || ''}`}>
                        {topThree[1].highestPoint || "--"}
                    </Badge>
                </div>

                {/* First Place */}
                <div className="flex flex-col items-center">
                    <Avatar className={`w-24 h-24 border-4 ${ranks[0]?.borderColor || ''} mb-2`}>
                        <AvatarImage src={topThree[0].avatar} alt={topThree[0].name} />
                        <AvatarFallback>{topThree[0].name?.[0] || "--"}</AvatarFallback>
                    </Avatar>
                    <Trophy className={`w-10 h-10 ${ranks[0]?.color || ''} mb-2`} />
                    <p className="font-semibold text-center">{topThree[0].name}</p>
                    <Badge variant="secondary" className={`mt-1 ${ranks[0]?.bgColor || ''} ${ranks[0]?.color || ''}`}>
                        {topThree[0].highestPoint || "--"}
                    </Badge>
                </div>

                {/* Third Place */}
                <div className="flex flex-col items-center">
                    <Avatar className={`w-20 h-20 border-4 ${ranks[2]?.borderColor || ''} mb-2`}>
                        <AvatarImage src={topThree[2].avatar} alt={topThree[2].name} />
                        <AvatarFallback>{topThree[2].name?.[0] || "--"}</AvatarFallback>
                    </Avatar>
                    <Trophy className={`w-8 h-8 ${ranks[2]?.color || ''} mb-2`} />
                    <p className="font-semibold text-center">{topThree[2].name}</p>
                    <Badge variant="secondary" className={`mt-1 ${ranks[2]?.bgColor || ''} ${ranks[2]?.color || ''}`}>
                        {topThree[2].highestPoint || "--"}
                    </Badge>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
