import express from "express";
import mongoose from "mongoose";
import { config } from "./config/config.js";
import { Login, Register } from "./controllers/auth.controller.js";
import {
  Global,
  Markets,
  Coin,
  Prices,
} from "./controllers/coins.controller.js";
import { AddToken, UserPortfolio } from "./controllers/portfolio.controller.js";
import { LogActivity } from "./middleware/LogActivity.js";

const app = express();
app.use(express.json());

app.post("/api/register", LogActivity, Register);
app.post("/api/login", LogActivity, Login);
app.get("/api/global", Global);
app.get("/api/markets", Markets);
app.get("/api/coins/:id", Coin);
app.get("/api/prices", Prices);
app.post("/api/add-token", AddToken);
app.get("/api/portfolio/:username", UserPortfolio);

async function main() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("Connected to MongoDB");
    app.listen(config.port, () =>
      console.log(`Server is running on port ${config.port}`)
    );
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

main();
