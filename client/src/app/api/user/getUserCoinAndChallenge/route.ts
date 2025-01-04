import prisma from "@/lib/prisma";
import connectMongoDB from "@/lib/mongodb";

export async function GET(req: Request) {
    await connectMongoDB();
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const userId = searchParams.get('id');
    if (!userId) {
      return { status: 400, body: { message: 'userId is required' } };
    }


    const user = await prisma.users.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            coinPoint: true,
            questLog: true,
            challenges: true,
        }
    });

    if (!user) {
        return { status: 400, body: { message: 'user not found' } };
    }

    return new Response(JSON.stringify(user), { status: 200 });
}