import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { dbConnect } from '@/lib/db';
import User from '@/models/User';
import { signJwt } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json().catch(() => ({} as any));

    if (!email || !/\S+@\S+\.\S+/.test(email) || !password) {
      return NextResponse.json(
        { message: 'Invalid email or password.' },
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await User.findOne({ email }).lean();
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    if (!user.passwordHash || typeof user.passwordHash !== 'string') {
      console.error('User has no passwordHash:', { userId: user._id, email: user.email });
      return NextResponse.json({ message: 'Account misconfigured' }, { status: 500 });
    }

    const ok = await bcrypt.compare(password, user.passwordHash).catch((e) => {
      console.error('bcrypt.compare error:', e);
      return false;
    });
    if (!ok) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = signJwt({ id: String(user._id) });

    const res = NextResponse.json({
      user: { id: String(user._id), email: user.email },
    });
    res.cookies.set('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (err) {
    console.error('POST /api/auth/login failed:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
