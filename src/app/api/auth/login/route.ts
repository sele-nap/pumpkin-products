import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { dbConnect } from '@/lib/db';
import User from '@/models/User';
import { signJwt } from '@/lib/auth';


export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });


    const token = signJwt({ id: user._id });
    const res = NextResponse.json({ user: { id: user._id, email: user.email } });
    res.cookies.set('token', token, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7 });
    return res;
  } catch (e) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}