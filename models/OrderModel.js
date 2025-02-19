import mongoose from "mongoose"
const {Schema}= mongoose

const OrderSchema=new Schema({
    items:{type:[Schema.Types.Mixed], required:true},
    totalAmount: { type: Number, required:true },
    totalItems: { type: Number, required:true },
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    paymentMethod: { type: String, required: true},
    paymentStatus: { type: String, default: 'pending' },
    orderstatus: { type: String, default: 'Processing' },  
    selectedAddress: { type: Schema.Types.Mixed, required: true },
},  { timestamps: true })

export default mongoose.model('order',OrderSchema)