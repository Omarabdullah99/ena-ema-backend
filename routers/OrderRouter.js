import express from 'express'
import { createOrder, getAllOrder, getOrderByUserId } from '../controllers/OrderController.js'

const OrderRouter= express.Router()

OrderRouter.post('/createOrder',createOrder)
OrderRouter.get('/allOrder',getAllOrder)
OrderRouter.get('/orderByUserId/:UserId',getOrderByUserId)

export default OrderRouter