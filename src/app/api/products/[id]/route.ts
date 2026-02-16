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

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = getUserId(req);
  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  try {
    const body = await req.json();

    // Validation
    if (!body.name || body.name.trim() === '') {
      return NextResponse.json(
        { message: 'Name is required' },
        { status: 400 }
      );
    }

    const exists = await prisma.product.findFirst({ where: { id, ownerId: userId } });
    if (!exists) return NextResponse.json({ message: 'Not found' }, { status: 404 });

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: body.name.trim(),
        variety: body.variety ? body.variety.trim() : null,
        color: body.color ? body.color.trim() : null,
        weightKg: body.weightKg ? Number(body.weightKg) : null,
        priceEUR: body.priceEUR ? Number(body.priceEUR) : null,
        imageUrl: body.imageUrl ? body.imageUrl.trim() : null,
        description: body.description ? body.description.trim() : null,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { message: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = getUserId(req);
  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const exists = await prisma.product.findFirst({ where: { id, ownerId: userId } });
  if (!exists) return NextResponse.json({ message: 'Not found' }, { status: 404 });

  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
