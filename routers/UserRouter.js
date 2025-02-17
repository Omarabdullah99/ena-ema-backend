import express from 'express'
import { signin, signup, testUser } from '../controllers/UserController.js'

const UserRouter = express.Router()

UserRouter.post('/createUser', signup)
UserRouter.post('/login',signin)
UserRouter.get('/test',testUser)


export default UserRouter