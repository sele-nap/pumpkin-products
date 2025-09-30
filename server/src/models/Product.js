import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
name: { type: String, required: true, trim: true },
variety: { type: String, default: '' },
color: { type: String, default: '' },
weightKg: { type: Number, default: 0 },
priceEUR: { type: Number, default: 0 },
description: { type: String, default: '' },
imageUrl: { type: String, default: '' },
owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });


export default mongoose.model('Product', productSchema);