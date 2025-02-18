import express from 'express'

import { createAddToCart, deleteCartById, getAllAddToCart, getCartByUserId, testCart, updateCartById } from '../controllers/AddToCartController.js'


const CartRouter= express.Router()

CartRouter.post('/createCart',createAddToCart)
CartRouter.get('/allcarts',getAllAddToCart)
CartRouter.get('/testCart',testCart)
CartRouter.get('/cartByUserId/:UserId',getCartByUserId)
CartRouter.put('/updateCart/:cartId',updateCartById)
CartRouter.delete('/deleteCart/:cartId',deleteCartById)

export default CartRouter




