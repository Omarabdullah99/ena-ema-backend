import express from 'express'
import { createProduct, deleteProduct, fetchAllProduct, fetchProductById, testProduct, updateProduct } from '../controllers/ProductController.js'


const ProductRouter= express.Router()

ProductRouter.get('/testproduct',testProduct)
ProductRouter.post('/createProduct',createProduct)
ProductRouter.get('/fetchProducts',fetchAllProduct)
ProductRouter.get('/productById/:id',fetchProductById)
ProductRouter.patch('/updateProduct/:id',updateProduct)
ProductRouter.delete('/deleteProduct/:id',deleteProduct)

export default ProductRouter