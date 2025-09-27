import bcrypt from "bcrypt";
import User from "../model/User.js";

export async function Register(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ error: "Username and password are required" });

    const exists = await User.findOne({ username });
    if (exists)
      return res.status(409).json({ error: "Username already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hash,
      tokens: [],
      createdAt: Date.now(),
    });

    res
      .status(201)
      .json({ id: user._id, username: user.username, tokens: user.tokens });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function Login(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ error: "Username and password are required" });

    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ error: "Invalid username or password" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return res.status(400).json({ error: "Invalid username or password" });

    res.json({ id: user._id, username: user.username, tokens: user.tokens });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
