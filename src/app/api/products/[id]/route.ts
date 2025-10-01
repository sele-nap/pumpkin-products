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

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const userId = getUserId(req);
  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const id = params.id;
  const body = await req.json();

  // Ensure ownership
  const exists = await prisma.product.findFirst({ where: { id, ownerId: userId } });
  if (!exists) return NextResponse.json({ message: 'Not found' }, { status: 404 });

  const updated = await prisma.product.update({
    where: { id },
    data: {
      name: body.name,
      variety: body.variety ?? null,
      color: body.color ?? null,
      weightKg: body.weightKg ?? null,
      priceEUR: body.priceEUR ?? null,
      imageUrl: body.imageUrl ?? null,
      description: body.description ?? null,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const userId = getUserId(req);
  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const id = params.id;
  const exists = await prisma.product.findFirst({ where: { id, ownerId: userId } });
  if (!exists) return NextResponse.json({ message: 'Not found' }, { status: 404 });

  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
