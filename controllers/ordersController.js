import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  const { items, deliveryTime, instructions, address, totalAmount } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  if (!items.every((i) => i.productId && i.quantity > 0 && i.price >= 0)) {
    return res.status(400).json({ message: "Invalid item in cart" });
  }

  try {
    const order = new Order({
      items,
      deliveryTime,
      instructions,
      address,
      totalAmount,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error("❌ Error saving order:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};
