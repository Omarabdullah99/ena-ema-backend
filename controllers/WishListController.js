import mongoose from "mongoose";
import WishListModel from "../models/WishListModel.js";


export const createWishList = async (req, res) => {
  try {
    let data = req.body;
    const result = await WishListModel.create(data);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const testWishList = (req, res) => {
  res.send("hello test wishlist");
};

export const getAllWishList = async (req, res) => {
  try {
    let data = await WishListModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getWishListByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ error: "Invalid UserId format" });
    }

    let matchStage={$match:{userId:new mongoose.Types.ObjectId(userId)}}

    let joinWithUserStage={
        $lookup:{
            from:"users",
            localField:"userId",
            foreignField:"_id",
            as:"user"
        }
    }

    let joinWithProductStage={
        $lookup:{
            from:"products",
            localField:"productId",
            foreignField:"_id",
            as:"product"
        }
    }

    let unwindUserStage={
        $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true,
          },
    }
    let unwindProductStage={
        $unwind: {
            path: "$product",
            preserveNullAndEmptyArrays: true,
          },
    }

  let data = await WishListModel.aggregate([
    matchStage,
    joinWithUserStage,joinWithProductStage,
    unwindUserStage,unwindProductStage
  ])
  res.status(200).json(data)
  } catch (error) {
    res.status(400).json(error)
  }
};


export const deletWishListById=async(req,res)=>{
    try {
        const id= req.params.id
        const deleteWishList= await WishListModel.findByIdAndDelete(id)
        res.status(200).json(deleteWishList)
    } catch (error) {
        res.status(400).json(error)
    }
}
