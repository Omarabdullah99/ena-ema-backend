import express from 'express'
import { createProduct, fetchAllProduct, fetchProductById, testProduct } from '../controllers/ProductController.js'


const ProductRouter= express.Router()

ProductRouter.get('/testproduct',testProduct)
ProductRouter.post('/createProduct',createProduct)
ProductRouter.get('/fetchProducts',fetchAllProduct)
ProductRouter.get('/productById/:id',fetchProductById)

export default ProductRouter