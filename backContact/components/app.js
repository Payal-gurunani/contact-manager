import express from 'express'
import userRoutes from '../components/routes/user.routes.js'

const app = express();
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true}))
app.use("/api/v1/users",userRoutes)
export {app}