import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';


export function requireAuth(req, res, next) {
const header = req.headers.authorization || '';
const token = header.startsWith('Bearer ') ? header.slice(7) : null;
if (!token) return res.status(401).json({ message: 'Missing token' });
try {
const payload = jwt.verify(token, JWT_SECRET);
req.user = { id: payload.id };
next();
} catch (e) {
return res.status(401).json({ message: 'Invalid or expired token' });
}
}