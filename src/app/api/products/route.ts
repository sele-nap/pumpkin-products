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


export async function GET(req: Request) {
  const userId = getUserId(req);
  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  await dbConnect();
  const list = await Product.find({ owner: userId }).sort({ createdAt: -1 });
  return NextResponse.json(list);
}


export async function POST(req: Request) {
  const userId = getUserId(req);
  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  await dbConnect();
  try {
    const body = await req.json();
    const created = await Product.create({ ...body, owner: userId });
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
  }
}