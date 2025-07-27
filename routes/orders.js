// routes/orders.js
import express from "express";
import { createOrder, getOrdersBySupplier } from "../controllers/ordersController.js";

const router = express.Router();

// Create order
router.post("/", createOrder);

// Get orders for a supplier
router.get("/supplier/:supplierId", getOrdersBySupplier);

export default router;
