//omarabdullah917303 password:cnBEY1kC5PtAHgsO
import express from 'express'
import cors from "cors"
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './routers/UserRouter.js';
import ProductRouter from './routers/ProductRouter.js';
import BrandRouter from './routers/BrandRouter.js';
import CategoryRouter from './routers/CategoryRouter.js';
import CartRouter from './routers/CartRouter.js';
import OrderRouter from './routers/OrderRouter.js';
import WishListRouter from './routers/WishListRouter.js';





dotenv.config();


const PORT= process.env.PORT || 5000

const app = express()

//middleware
app.use(morgan("dev"))
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(
  {
    exposedHeaders: ['X-Total-Count']
  }
))

//*Router Middleware
app.use("/users",UserRouter)
app.use("/products",ProductRouter)
app.use("/brand",BrandRouter)
app.use("/category",CategoryRouter)
app.use("/cart",CartRouter)
app.use("/order",OrderRouter)
app.use("/wishList",WishListRouter)



//*mongodb connection
const MONGODB_URL="mongodb+srv://omarabdullah917303:cnBEY1kC5PtAHgsO@ena-ema-task.ag4cv.mongodb.net/?retryWrites=true&w=majority&appName=ena-ema-task"

main().catch(err => console.log(err))
async function main(){
    await mongoose.connect(MONGODB_URL);
    console.log('database connected')
  }

app.get('/', (req, res) => {
    res.send("e-coomerce server is running")
});


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
  })