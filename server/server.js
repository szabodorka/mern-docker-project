import express from "express"
import User from "./model/User.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose"


mongoose.connect("mongodb+srv://ivitsmilu:Jelszo12345@employees-cluster.rvprd.mongodb.net/");

const PORT = 3005;

const app = express();
app.use(express.json());

app.post("/api/data", async (req, res) =>{
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
app.post("/api/login", async (req, res) => {

    let user = await User.findOne({ username: req.body.username });
    console.log(req.body);
    if (!user) {
      return res.status(400).json({ error: "This username is not found!" });
    }
    console.log("User found:", user);
    
    const passwordCompare = await bcrypt.compare(req.body.password, user.password);
    if (!passwordCompare) {
      return res
        .status(400)
        .json({ error: "Wrong password!" });
    }
    
    try {
        console.log(user);
        res.json(user)
    } catch (error) {
        console.error(error)
    }

    

  });

app.listen(PORT, () => console.log("Server is running on port 3005"))



