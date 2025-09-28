import { config } from "../config/config.js";

export async function Global(_req, res) {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/global", {
      headers: { "x-cg-demo-api-key": config.coinGeckoKey },
    });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    res.json(data.data);
  } catch (e) {
    console.error("Error fetching global data", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function Markets(_req, res) {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1",
      {
        headers: {
          "x-cg-demo-api-key": config.coinGeckoKey,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (e) {
    console.error("Error fetching crypto data", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function Coin(req, res) {
  try {
    const { id } = req.params;
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}`,
      {
        headers: {
          "x-cg-demo-api-key": config.coinGeckoKey,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (e) {
    console.error("Error fetching selected token", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function Prices(req, res) {
  try {
    const ids = String(req.query.ids);
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(
        ids
      )}&vs_currencies=usd`,
      {
        headers: {
          "x-cg-demo-api-key": config.coinGeckoKey,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (e) {
    console.error("Error fetching prices:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
