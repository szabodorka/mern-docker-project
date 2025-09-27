import User from "../model/User.js";

export async function AddToken(req, res) {
  try {
    const { username, token } = req.body;
    if (!username || !token?.name || typeof token?.amount !== "number") {
      return res
        .status(400)
        .json({ error: "username, token.name, token.amount required" });
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const existingToken = user.tokens.find((t) => t.name === token.name);
    if (existingToken) existingToken.amount += token.amount;
    else user.tokens.push({ name: token.name, amount: token.amount });

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (e) {
    console.error("Error adding token:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function UserPortfolio(req, res) {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user.tokens || []);
  } catch (e) {
    console.error("Error finding user:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
