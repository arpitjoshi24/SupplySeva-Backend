import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  category: { type: String, default: 'Vegetables' },
  imageUrl: { type: String },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
