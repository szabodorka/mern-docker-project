import { Router } from "express";

const router = Router();

router.get("/global", async (_req, res) => {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/global", {
      headers: { "x-cg-demo-api-key": process.env.COINGECKO_KEY },
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    res.json(data.data);
  } catch (error) {
    console.error("Error fetching data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/markets", async (_req, res) => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1",
      {
        headers: {
          "x-cg-demo-api-key": process.env.COINGECKO_KEY,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching crypto data", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/coins/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}`,
      {
        headers: {
          "x-cg-demo-api-key": process.env.COINGECKO_KEY,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching selected token", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
