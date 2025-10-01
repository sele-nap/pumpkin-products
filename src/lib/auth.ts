import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? '';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

if (!JWT_SECRET) throw new Error('Missing JWT_SECRET');

export type TokenPayload = JwtPayload & { id: string; email?: string };

export function signJwt(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyJwt<T = TokenPayload>(token?: string): T | null {
  try {
    if (!token) return null;
    return jwt.verify(token, JWT_SECRET) as T;
  } catch {
    return null;
  }
}