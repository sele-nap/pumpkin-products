import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import { PORT, MONGO_URI } from './config.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';


const app = express();


app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());


app.get('/', (_req, res) => res.json({ ok: true, service: 'pumpkin-products-api' }));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);


mongoose.connect(MONGO_URI).then(() => {
  console.log('Mongo connected');
  app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
}).catch(err => {
  console.error('Mongo error', err);
  process.exit(1);
});