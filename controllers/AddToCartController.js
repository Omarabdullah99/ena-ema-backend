import AddToCartModel from "../models/AddToCartModel.js";
import mongoose from 'mongoose'
export const testCart= async(req,res)=>{
    res.send('test cart')
}

export const createAddToCart = async (req, res) => {
    let data = req.body;
    //console.log('branddata',data)
    try {
      let result = await AddToCartModel.create(data);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  export const getAllAddToCart=async(req,res)=>{
    try {
        let result= await AddToCartModel.find()
        res.status(200).json(result)
        
    } catch (error) {
        res.status(400).json(error);
    }
  }

  export const getCartByUserId= async(req,res)=>{
    try {
        let UserId = req.params.UserId;
        console.log('userid',UserId)

        
      if (!mongoose.isValidObjectId(UserId)) {
        return res.status(400).json({ error: "Invalid UserId format" });
      }

      let matchStage = {
        $match: { userID: new mongoose.Types.ObjectId(UserId) },
      };

      let JoinWithUserStage = {
        $lookup: {
          from: "users",
          localField: "userID",
          foreignField: "_id",
          as: "user",
        },
      };


      let JoinWithProductStage = {
        $lookup: {
          from: "products",
          localField: "productID",
          foreignField: "_id",
          as: "product",
        },
      };

      let unwindUserStage = {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      };

      let unwindProductStage = {
        $unwind: {
          path: "$product",
          preserveNullAndEmptyArrays: true,
        },
      };

      let ProjectionStage = { $project: { "user._id": 0, "product._id": 0 } };

      let data = await AddToCartModel.aggregate([
        matchStage,
        JoinWithUserStage,JoinWithProductStage,
        unwindUserStage,unwindProductStage,
        ProjectionStage
      ])

      res.status(200).json(data)

      

    } catch (error) {
        res.status(400).json(error)
        
    }
  }

 

  export const updateCartById = async (req, res) => {
    try {
        let cartId = req.params.cartId; 
        let data = req.body;

        if (!mongoose.isValidObjectId(cartId)) {
            return res.status(400).json({ error: "Invalid Cart ID format" });
        }

        let updatedCart = await AddToCartModel.findByIdAndUpdate(
            cartId,
            { $set: data },
            { new: true } 
        );

        console.log(updatedCart);

        if (!updatedCart) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        let userId = updatedCart.userID; 

        let matchStage = {
            $match: {
                _id: new mongoose.Types.ObjectId(cartId),  
                userID: new mongoose.Types.ObjectId(userId),  
            },
        };

        let JoinWithUserStage = {
            $lookup: {
                from: "users",
                localField: "userID",
                foreignField: "_id",
                as: "user",
            },
        };

        let JoinWithProductStage = {
            $lookup: {
                from: "products",
                localField: "productID",
                foreignField: "_id",
                as: "product",
            },
        };

        let unwindUserStage = { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } };
        let unwindProductStage = { $unwind: { path: "$product", preserveNullAndEmptyArrays: true } };
        let ProjectionStage = { $project: { "user._id": 0, "product._id": 0 } };

        let updatedCartData = await AddToCartModel.aggregate([
            matchStage,
            JoinWithUserStage,
            JoinWithProductStage,
            unwindUserStage,
            unwindProductStage,
            ProjectionStage
        ]);

        res.status(200).json(updatedCartData);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteCartById=async(req,res)=>{
    const cartId=req.params.cartId
    try {
      const deleteCart= await AddToCartModel.findByIdAndDelete(cartId)
      res.status(200).json(deleteCart)
    } catch (error) {
      res.status(400).json(error)
      
    }
  }

