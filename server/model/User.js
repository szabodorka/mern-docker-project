import mongoose from "mongoose";

const {Schema, model} = mongoose

const userSchema = new Schema ({
    username: String,
    password: String, 
    tokens: Array,
    createdAt: Date
})

export default model("User", userSchema)
