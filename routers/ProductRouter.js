import express from 'express'
import { createProduct, testProduct } from '../controllers/ProductController.js'


const ProductRouter= express.Router()

ProductRouter.get('/testproduct',testProduct)
ProductRouter.post('/createProduct',createProduct)

export default ProductRouter