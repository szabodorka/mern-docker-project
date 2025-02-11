import express from "express"
import User from "./model/User.js";
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://ivitsmilu:Jelszo12345@employees-cluster.rvprd.mongodb.net/");

const PORT = 3005;

const app = express();
app.use(express.json());


app.post("/api/data", async (req, res) =>{

    const username = req.body.username
    const password = req.body.password
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