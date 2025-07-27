import mongoose from "mongoose";
import Order from "../models/Order.js"; // make sure this import exists and is correct

export const createOrder = async (req, res) => {
  try {
    const { items, deliveryTime, instructions, address, totalAmount } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    if (
      !items.every(
        (i) =>
          i.name &&
          typeof i.name === "string" &&
          Number.isInteger(i.quantity) &&
          i.quantity > 0 &&
          typeof i.price === "number" &&
          i.price >= 0 &&
          i.supplierId &&
          typeof i.supplierId === "string"
      )
    ) {
      return res.status(400).json({ message: "Invalid item in cart. Please check supplierId and fields." });
    }

    if (!deliveryTime || typeof deliveryTime !== "string") {
      return res.status(400).json({ message: "Delivery time is required" });
    }

    if (!address || typeof address !== "string") {
      return res.status(400).json({ message: "Delivery address is required" });
    }

    if (typeof totalAmount !== "number" || totalAmount <= 0) {
      return res.status(400).json({ message: "Invalid total amount" });
    }

    const order = new Order({
      items: items.map(item => ({
        ...item,
        supplierId: new mongoose.Types.ObjectId(item.supplierId),
      })),
      deliveryTime,
      instructions: instructions || "None",
      address,
      totalAmount,
    });

    await order.save();

    return res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("❌ Error saving order:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

// ✅ Add this function and export it too
export const getOrdersBySupplier = async (req, res) => {
  try {
    const { supplierId } = req.params;

    if (!supplierId) {
      return res.status(400).json({ message: "Supplier ID is required" });
    }

    const orders = await Order.find({ "items.supplierId": supplierId });

    return res.status(200).json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    return res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};
