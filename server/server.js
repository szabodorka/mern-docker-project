import express from "express";
import User from "./model/User.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = 3005;

const app = express();
app.use(express.json());

app.get("/api/global", async (req, res) => {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/global", {
      headers: { "x-cg-demo-api-key": "CG-uBfevfq9VNo4mH54FXXjS4vK" },
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

app.get("/api/markets", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1",
      {
        headers: {
          "x-cg-demo-api-key": "CG-uBfevfq9VNo4mH54FXXjS4vK",
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

app.get("/api/coins/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}`,
      {
        headers: {
          "x-cg-demo-api-key": "CG-uBfevfq9VNo4mH54FXXjS4vK",
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
  }
});

app.post("/api/data", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const username = req.body.username;
  const password = await bcrypt.hash(req.body.password, salt);
  const tokens = req.body.tokens;
  const createdAt = Date.now();

  const user = new User({
    username,
    password,
    tokens,
    createdAt,
  });

  try {
    const createdUser = await user.save();
    console.log("User created sucessfully:", createdUser);
  } catch (error) {
    console.error(error);
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required!" });
  }

  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "This username is not found!" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Wrong password!" });
    }

    res.json({
      id: user._id,
      username: user.username,
      tokens: user.tokens,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.patch("/api/add-token", async (req, res) => {
  const { username, token } = req.body;
  const { name, amount } = token;

  try {
    let user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "User not found" });

    let existingToken = user.tokens.find((t) => t.name === name);
    if (existingToken) {
      existingToken.amount += amount;
    } else {
      user.tokens.push({ name, amount });
    }

    let updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error adding token:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log("Server is running on port 3005"));
