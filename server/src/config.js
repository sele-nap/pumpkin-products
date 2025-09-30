import dotenv from 'dotenv';
dotenv.config();


export const PORT = process.env.PORT || 4000;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';