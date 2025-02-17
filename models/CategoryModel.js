import mongoose from "mongoose"

const {Schema}= mongoose

const CategorySchema= new Schema({
    label:{type:String, required:true, unique:true},
    value:{type:String, required:true, unique:true}
})


export default mongoose.model("categories", CategorySchema)