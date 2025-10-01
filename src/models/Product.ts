import { Schema, models, model } from 'mongoose';


const ProductSchema = new Schema({
  name: { type: String, required: true, trim: true },
  variety: { type: String, default: '' },
  color: { type: String, default: '' },
  weightKg: { type: Number, default: 0 },
  priceEUR: { type: Number, default: 0 },
  description: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });


export default models.Product || model('Product', ProductSchema);