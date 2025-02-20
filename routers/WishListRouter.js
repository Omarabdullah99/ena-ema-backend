import express from 'express'
import { createWishList, deletWishListById, getAllWishList, getWishListByUserId, testWishList } from '../controllers/WishListController.js'

const WishListRouter= express.Router()

WishListRouter.post('/createWishList',createWishList)
WishListRouter.get('/testWishList',testWishList)
WishListRouter.get("/allWishList",getAllWishList)
WishListRouter.get("/wishListByUserId/:userId",getWishListByUserId)
WishListRouter.delete('/deleteWishList/:id',deletWishListById)

export default WishListRouter