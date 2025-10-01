import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signJwt } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !/\S+@\S+\.\S+/.test(email) || !password) {
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });

    const token = signJwt({ id: user.id, email: user.email });

    const res = NextResponse.json({ user: { id: user.id, email: user.email } });
    res.cookies.set('token', token, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7 });
    return res;
  } catch (err) {
    console.error('POST /api/auth/login failed:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}