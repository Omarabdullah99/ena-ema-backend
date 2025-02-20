import mongoose from "mongoose";
const {Schema}= mongoose
const WishListSchema= new Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, required:true},
    productId:{type:mongoose.Schema.Types.ObjectId, required:true}
})

export default mongoose.model('wishlist',WishListSchema)