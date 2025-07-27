import express from "express";

const router = express.Router();

router.post("/process-order", async (req, res) => {
  const { orderText } = req.body;
  console.log("🎤 Received order text:", orderText);

  const singularItems = ["tea", "samosa", "coffee", "juice", "cake", "burger", "pizza"];
  const itemsSet = new Set(singularItems);

  const words = orderText
    .toLowerCase()
    .replace(/[.,!?]/g, "") // Remove punctuation
    .split(/\s+/);

  const foundItems = new Set();

  for (let word of words) {
    // Normalize plural form (e.g., samosas → samosa)
    if (word.endsWith("s") && itemsSet.has(word.slice(0, -1))) {
      word = word.slice(0, -1);
    }

    if (itemsSet.has(word)) {
      foundItems.add(word);
    }
  }

  res.json({
    success: true,
    items: Array.from(foundItems),
  });
});

export default router;