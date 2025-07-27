import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct
} from '../controllers/productController.js';

const router = express.Router();

// Multer config for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });


// Routes
router.get('/', getProducts);                         // GET all products
router.post('/add', upload.single('image'), addProduct); // ADD product
router.put('/:id', upload.single('image'), updateProduct); // UPDATE product
router.delete('/:id', deleteProduct);                   // DELETE product
router.get('/:id', getSingleProduct);
export default router;
