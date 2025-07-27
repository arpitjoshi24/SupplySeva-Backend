import Order from "../models/Order.js";

export const placeOrder = async (req, res) => {
  try {
    const { items, deliveryTime, instructions, address, totalAmount } = req.body;

    if (!items || items.length === 0 || !deliveryTime || !address || !totalAmount) {
      return res.status(400).json({ error: "Missing required order fields" });
    }

    const newOrder = new Order({
      items,
      deliveryTime,
      instructions,
      address,
      totalAmount,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", orderId: newOrder._id });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




