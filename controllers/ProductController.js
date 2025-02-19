import ProductModel from "../models/ProductModel.js";
import mongoose from "mongoose";

export const createProduct = async (req, res) => {
  const data = req.body;

  try {
    const result = await ProductModel.create(data);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const fetchAllProduct = async (req, res) => {
  let query = ProductModel.find({});
  let totalProductsQuery = ProductModel.find({});

  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductsQuery = totalProductsQuery.find({
      category: req.query.category,
    });
  }

  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalProductsQuery = totalProductsQuery.find({
      brand: req.query.brand,
    });
  }

  //TODo: How to get sort on discounted price not an Actual price
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalProductsQuery.countDocuments().exec();
  console.log("totalDocs", totalDocs);

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
    console.log("Error of fetallproduct", err);
  }
};

export const fetchProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProduct=async(req,res)=>{
  console.log("body",req.body)
  const {id}= req.params
  console.log('id for update', id)
  try {
    const product= await ProductModel.findByIdAndUpdate(id, req.body,{new:true})
    res.status(200).json(product)
  } catch (err) {
    res.status(400).json(err)
    
  }

}

export const testProduct = async (req, res) => {
  res.send("helloProduct");
};
