import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signJwt } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !/\S+@\S+\.\S+/.test(email) || !password || password.length < 6) {
      return NextResponse.json({ message: 'Invalid email or password too short' }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ message: 'Email already in use' }, { status: 409 });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, passwordHash } });

    const token = signJwt({ id: user.id, email: user.email });
    const res = NextResponse.json({ user: { id: user.id, email: user.email } }, { status: 201 });
    res.cookies.set('token', token, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7 });
    return res;
  } catch (err) {
    console.error('POST /api/auth/signup failed:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}