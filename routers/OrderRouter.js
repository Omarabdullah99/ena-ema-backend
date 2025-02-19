import express from 'express'
import { createOrder,  fetchAllOrders,  getOrderByUserId, updateOrder } from '../controllers/OrderController.js'

const OrderRouter= express.Router()

OrderRouter.post('/createOrder',createOrder)
OrderRouter.get('/allOrder',fetchAllOrders)
OrderRouter.get('/orderByUserId/:UserId',getOrderByUserId)
OrderRouter.patch('/updateOrderById/:id',updateOrder)

export default OrderRouter