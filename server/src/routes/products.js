import { Router } from 'express';
import Product from '../models/Product.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);

// Create
router.post('/', async (req, res) => {
try {
const data = { ...req.body, owner: req.user.id };
const created = await Product.create(data);
res.status(201).json(created);
} catch (e) {
res.status(400).json({ message: 'Invalid payload' });
}
});

// Read all
router.get('/', async (req, res) => {
const list = await Product.find({ owner: req.user.id }).sort({ createdAt: -1 });
res.json(list);
});

// Read one
router.get('/:id', async (req, res) => {
const item = await Product.findOne({ _id: req.params.id, owner: req.user.id });
if (!item) return res.status(404).json({ message: 'Not found' });
res.json(item);
});

// Update
router.put('/:id', async (req, res) => {
const updated = await Product.findOneAndUpdate(
{ _id: req.params.id, owner: req.user.id },
req.body,
{ new: true }
);
if (!updated) return res.status(404).json({ message: 'Not found' });
res.json(updated);
});

// Delete
router.delete('/:id', async (req, res) => {
const deleted = await Product.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
if (!deleted) return res.status(404).json({ message: 'Not found' });
res.json({ ok: true });
});

export default router;