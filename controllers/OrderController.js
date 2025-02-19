import AddToCartModel from "../models/AddToCartModel.js";
import OrderModel from "../models/OrderModel.js";
import ProductModel from "../models/ProductModel.js";
import mongoose from "mongoose";

export const createOrder = async (req, res) => {
  const order = new OrderModel(req.body);
  console.log("first order for req.body", order);
  // here we have to update stocks;
  for (let item of order.items) {
    let product = await ProductModel.findOne({ _id: item.productID });
    product.$inc("stock", -1 * item.quantity);
    // for optimum performance we should make inventory outside of product.
    await product.save();
  }

  try {
    const doc = await order.save();
    // অর্ডার সফল হলে, কার্ট খালি করা
    await AddToCartModel.deleteMany({ userID: order.userID });

    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

// export const getAllOrder = async (req, res) => {
//   try {
//     let result = await OrderModel.find();
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

export const fetchAllOrders=async(req,res)=>{
  //pagination= {_page:1, _limit=2}
  let query= OrderModel.find({})
  let totalOrdersQuery= OrderModel.find({})
  const totalDocs= await totalOrdersQuery.countDocuments().exec()
  console.log("page",req.query._page)
  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }
  try {
    const doc= await  query.exec()
    res.set("X-Total-Count",totalDocs)
    res.status(200).json(doc)
  } catch (error) {
    res.status(400).json(error)
    
  }
}


 export const getOrderByUserId= async(req,res)=>{
    try {
        let UserId = req.params.UserId;
        console.log('userid',UserId)

        
      if (!mongoose.isValidObjectId(UserId)) {
        return res.status(400).json({ error: "Invalid UserId format" });
      }

      let matchStage = {
        $match: { userID: new mongoose.Types.ObjectId(UserId)},
      };

      let JoinWithUserStage = {
        $lookup: {
          from: "users",
          localField: "userID",
          foreignField: "_id",
          as: "user",
        },
      };


      let unwindUserStage = {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      };

      let data = await OrderModel.aggregate([
        matchStage,
        JoinWithUserStage,
        unwindUserStage,
      ])

      res.status(200).json(data)

      

    } catch (error) {
        res.status(400).json(error)
        
    }
  }

  export const updateOrder=async(req,res)=>{
    const {id}= req.params
    try {
      const doc= await OrderModel.findByIdAndUpdate(id, req.body, {new:true})
      res.status(200).json(doc)
    } catch (error) {
      res.status(400).json(error)
    }
  
  }
