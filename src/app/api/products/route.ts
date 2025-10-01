import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJwt } from '@/lib/auth';

function getUserId(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const m = cookie.match(/(?:^|; )token=([^;]+)/);
  if (!m) return null;
  const token = decodeURIComponent(m[1]);
  const payload = verifyJwt<{ id: string }>(token);
  return payload?.id ?? null;
}

export async function GET(req: Request) {
  const userId = getUserId(req);
  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const items = await prisma.product.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const userId = getUserId(req);
  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const created = await prisma.product.create({
    data: {
      name: body.name,
      variety: body.variety ?? null,
      color: body.color ?? null,
      weightKg: body.weightKg ?? null,
      priceEUR: body.priceEUR ?? null,
      imageUrl: body.imageUrl ?? null,
      description: body.description ?? null,
      ownerId: userId,
    },
  });

  return NextResponse.json(created, { status: 201 });
}