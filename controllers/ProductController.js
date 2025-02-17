import ProductModel from "../models/ProductModel.js";


export const createProduct = async (req, res) => {
    const data = req.body

    try {
        const result= await ProductModel.create(data)
      res.status(201).json(result)

    } catch (err) {
      res.status(400).json(err);
    }
  };

  export const testProduct = async(req,res)=>{
    res.send('helloProduct')
  }