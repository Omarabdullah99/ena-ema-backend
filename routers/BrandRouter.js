import express from 'express'
import { createBrand, fetchBrands } from '../controllers/BrandController.js'

const BrandRouter= express.Router()

BrandRouter.post('/createBrand',createBrand)
BrandRouter.get('/allbrands',fetchBrands)

export default BrandRouter