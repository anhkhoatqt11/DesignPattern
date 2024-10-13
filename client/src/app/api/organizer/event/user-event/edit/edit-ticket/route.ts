import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();

  const ticket = await prisma.ve.update({
    where: {
        id: body?.id,
    },
    data: {
        ...body
    },
  });
  if (ticket) {
    return new Response(JSON.stringify(ticket), { status: 200 });
  }
}