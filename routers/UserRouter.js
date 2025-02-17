import express from 'express'
import { allUsers, findUserById, signin, signup, testUser } from '../controllers/UserController.js'

const UserRouter = express.Router()

UserRouter.post('/createUser', signup)
UserRouter.post('/login',signin)
UserRouter.get('/allUsers',allUsers)
UserRouter.get('/findUserById/:id',findUserById)
UserRouter.get('/test',testUser)


export default UserRouter