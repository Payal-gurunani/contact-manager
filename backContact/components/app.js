import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import userRoutes from '../components/routes/user.routes.js'
import contactRoutes from '../components/routes/contact.routes.js'
const app = express();
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:4001', // Allow your frontend origin
  credentials: true                // If you're using cookies or auth headers
}));

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true}))
app.use("/api/v1/users",userRoutes)
app.use("/api/v1/contacts",contactRoutes)
export {app}