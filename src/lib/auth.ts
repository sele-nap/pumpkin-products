import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';


export function signJwt(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}


export function verifyJwt<T = any>(token?: string): T | null {
  try { return token ? (jwt.verify(token, JWT_SECRET) as T) : null; }
  catch { return null; }
}