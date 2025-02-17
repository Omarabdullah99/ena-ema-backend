import BrandsModel from "../models/BrandsModel.js";

export const createBrand=async(req,res)=>{
    const data= req.body
    try {
        const result= await BrandsModel.create(data)
        res.status(201).json(result)
        
    } catch (err) {
        res.status(400).json(err)
    }
}

export const fetchBrands=async(req,res)=>{
    try {
        const brands= await BrandsModel.find({}).exec()
        res.status(200).json(brands)
    } catch (err) {
        res.status(400).json(err)
    }
}