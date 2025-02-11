import mongoose from "mongoose";

const {Schema, model} = mongoose

const userSchema = new Schema ({
    username: 
        {type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    tokens: Array,
    createdAt: Date
})

export default model("User", userSchema)
