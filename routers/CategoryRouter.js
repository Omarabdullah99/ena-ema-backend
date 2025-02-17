import express from 'express'
import { createCategory, fetchCategories } from '../controllers/CategoryController.js'

const CategoryRouter = express.Router()

CategoryRouter.post('/createCategory',createCategory)
CategoryRouter.get('/allCategory',fetchCategories)

export default CategoryRouter