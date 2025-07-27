import express from "express";
import axios from "axios";

const router = express.Router();

const BASE_URL = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";
const API_KEY = process.env.API_KEY || "579b464db66ec23bdd000001a920c31745f14a6a5b2477929c199017";

// ✅ Route: Get Mandi Prices
router.get("/prices", async (req, res) => {
  const { state, commodity } = req.query;

  try {
    const params = {
      format: "json",
      "api-key": API_KEY,
      limit: 5000,
    };

    const response = await axios.get(BASE_URL, { params });
    let records = response.data.records || [];

    if (state && state.trim() !== "") {
      records = records.filter(
        (record) => record.state?.toLowerCase() === state.trim().toLowerCase()
      );
    }

    if (commodity && commodity.trim() !== "") {
      records = records.filter(
        (record) => record.commodity?.toLowerCase() === commodity.trim().toLowerCase()
      );
    }

    if (records.length === 0) {
      return res.json({ message: "No data found for the given filters", records: [] });
    }

    res.json({ records });
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).json({ error: "Failed to fetch mandi data" });
  }
});

export default router;
