const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  const { items, deliveryTime, instructions, address, totalAmount } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  try {
    const order = new Order({
      items,
      deliveryTime,
      instructions,
      address,
      totalAmount
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};
