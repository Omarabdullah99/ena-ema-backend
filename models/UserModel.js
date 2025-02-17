import mongoose, { Schema } from "mongoose";

const userSchema= mongoose.Schema({
    name: { type: String, required:true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default:'user' },
    addresses: { type: [Schema.Types.Mixed] }, 
    // TODO:  We can make a separate Schema for this
    orders: { type: [Schema.Types.Mixed] }

})

export default mongoose.model("users", userSchema)