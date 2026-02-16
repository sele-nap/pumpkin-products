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

  try {
    const body = await req.json();

    // Validation
    if (!body.name || body.name.trim() === '') {
      return NextResponse.json(
        { message: 'Name is required' },
        { status: 400 }
      );
    }

    const created = await prisma.product.create({
      data: {
        name: body.name.trim(),
        variety: body.variety ? body.variety.trim() : null,
        color: body.color ? body.color.trim() : null,
        weightKg: body.weightKg ? Number(body.weightKg) : null,
        priceEUR: body.priceEUR ? Number(body.priceEUR) : null,
        imageUrl: body.imageUrl ? body.imageUrl.trim() : null,
        description: body.description ? body.description.trim() : null,
        ownerId: userId,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { message: 'Failed to create product' },
      { status: 500 }
    );
  }
}