import CategoryModel from "../models/CategoryModel.js"

export const createCategory= async(req,res)=>{
    const data= req.body
    try {
        const result= await CategoryModel.create(data)
        res.status(201).json(result)
        
    } catch (err) {
        res.status(400).json(err)
        
    }
}

export const fetchCategories=async(req,res)=>{
    try {
        const categories= await CategoryModel.find({}).exec()
        res.status(200).json(categories);
        
    } catch (err) {
        res.status(400).json(err);
        
    }

}