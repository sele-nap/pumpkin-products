import mongoose from 'mongoose';


const MONGO_URI = process.env.MONGO_URI!;
if (!MONGO_URI) throw new Error('Missing MONGO_URI');


let cached = (global as any)._mongoose;
if (!cached) cached = (global as any)._mongoose = { conn: null, promise: null };


export async function dbConnect() {
  if (cached.conn) return cached.conn as typeof mongoose;
  if (!cached.promise) { cached.promise = mongoose.connect(MONGO_URI).then(m => m); }
  cached.conn = await cached.promise;
  return cached.conn as typeof mongoose;
}