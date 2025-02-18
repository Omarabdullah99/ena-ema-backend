import mongoose from "mongoose"

const {Schema}=mongoose

const AddToCartSchema= new Schema({
    quantity: { type : Number, required: true, default:1},
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    productID: { type: mongoose.Schema.Types.ObjectId, required: true },
})

export default mongoose.model('carts',AddToCartSchema)