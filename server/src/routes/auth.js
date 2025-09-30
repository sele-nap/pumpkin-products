import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { validateEmail } from '../utils/validators.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config.js';


const router = Router();


router.post('/signup', async (req, res) => {
try {
const { email, password } = req.body;
if (!validateEmail(email) || !password || password.length < 6) {
return res.status(400).json({ message: 'Invalid email or password too short' });
}
const exists = await User.findOne({ email });
if (exists) return res.status(409).json({ message: 'Email already in use' });
const passwordHash = await bcrypt.hash(password, 10);
const user = await User.create({ email, passwordHash });
const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
res.status(201).json({ token, user: { id: user._id, email: user.email } });
} catch (e) {
res.status(500).json({ message: 'Server error' });
}
});


router.post('/login', async (req, res) => {
try {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(401).json({ message: 'Invalid credentials' });
const ok = await bcrypt.compare(password, user.passwordHash);
if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
res.json({ token, user: { id: user._id, email: user.email } });
} catch (e) {
res.status(500).json({ message: 'Server error' });
}
});


export default router;