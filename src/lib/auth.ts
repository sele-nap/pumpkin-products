import jwt, { JwtPayload, SignOptions, Secret } from 'jsonwebtoken';

const JWT_SECRET: Secret = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET');
}

export type TokenPayload = JwtPayload & { id: string; email?: string };

export function signJwt(payload: object): string {
  const options: SignOptions = { expiresIn: JWT_EXPIRES_IN };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyJwt<T = TokenPayload>(token?: string): T | null {
  try {
    if (!token) return null;
    return jwt.verify(token, JWT_SECRET) as T;
  } catch {
    return null;
  }
}