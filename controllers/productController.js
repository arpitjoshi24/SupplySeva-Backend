import Product from '../models/Product.js';

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, creatorId, creatorRole } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!creatorId || !creatorRole) {
      return res.status(400).json({ error: "creatorId and creatorRole are required" });
    }

    if (creatorRole !== 'supplier') {
      return res.status(403).json({ error: "Only suppliers can add products" });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      imageUrl,
      supplierId: creatorId, // ✅ changed to supplierId
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added', product: newProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (req.file) {
      updates.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updated = await Product.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product updated', product: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

