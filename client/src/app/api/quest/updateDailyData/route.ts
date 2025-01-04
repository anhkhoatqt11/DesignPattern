import prisma from "@/lib/prisma";
import connectMongoDB from "@/lib/mongodb";

export async function POST(request: Request) {
    try {
        await connectMongoDB();
        const body = await request.json();

        await prisma.users.update({
            where: { id: body.userId },
            data: {
                questLog: {
                    update: {
                        hasReceivedDailyGift: false,
                        finalTime: body.currentTime,
                        readingTime: 0,
                        watchingTime: 0,
                    }
                }
            }
        });

        return new Response(JSON.stringify({ message: "Quest log updated" }), { status: 200 });
    } catch (error) {
        console.error(error);
    }
}