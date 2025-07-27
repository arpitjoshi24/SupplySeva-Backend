// server.js or server.mjs
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from "./routes/orderRoutes.js";
import micRoutes from "./routes/micRoutes.js";
import mandiRoutes from "./routes/mandiRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Convert ESM file URL to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json()); // ✅ Parse JSON bodies

// Serve uploaded images or files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", micRoutes);
app.use("/api", mandiRoutes);

// Default route for testing
app.get('/', (req, res) => {
  res.send('🚀 API is running...');
});

// Error handling (optional enhancement)
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
