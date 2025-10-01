import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Product from '@/models/Product';
import { verifyJwt } from '@/lib/auth';


function getUserId(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const m = cookie.match(/(?:^|; )token=([^;]+)/);
  if (!m) return null;
  const token = decodeURIComponent(m[1]);
  const payload = verifyJwt<{ id: string }>(token);
  return payload?.id ?? null;
}


export async function GET(_req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const item = await Product.findById(params.id);
  return item ? NextResponse.json(item) : NextResponse.json({ message: 'Not found' }, { status: 404 });
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const userId = getUserId(req);
  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  await dbConnect();
  const updated = await Product.findOneAndUpdate({ _id: params.id, owner: userId }, await req.json(), { new: true });
  return updated ? NextResponse.json(updated) : NextResponse.json({ message: 'Not found' }, { status: 404 });
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const userId = getUserId(req);
  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  await dbConnect();
  const deleted = await Product.findOneAndDelete({ _id: params.id, owner: userId });
  return deleted ? NextResponse.json({ ok: true }) : NextResponse.json({ message: 'Not found' }, { status: 404 });
}