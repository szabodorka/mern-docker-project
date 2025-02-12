import express from "express"
import User from "./model/User.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose"


mongoose.connect("mongodb+srv://ivitsmilu:Jelszo12345@employees-cluster.rvprd.mongodb.net/");

const PORT = 3005;

const app = express();
app.use(express.json());

app.post("/api/data", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const username = req.body.username
    const password = await bcrypt.hash(req.body.password, salt)
    const tokens = req.body.tokens
    const createdAt = Date.now()


    const user = new User({

        username,
        password,
        tokens,
        createdAt

    })

    try {
        const createdUser = await user.save()
        console.log("User created sucessfully:", createdUser);
    } catch (error) {
        console.error(error)
    }

})

app.get("/api/login", async (req, res) => {
    const { username, password } = req.query

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required!" })
    }

    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "This username is not found!" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Wrong password!" });
        }

        res.json({
            id: user._id,
            username: user.username,
            password: user.password,
            tokens: user.tokens
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.listen(PORT, () => console.log("Server is running on port 3005"))



