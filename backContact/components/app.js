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

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/v1/users",userRoutes)
app.use("/api/v1/contacts",contactRoutes)
// Custom error handler (must be placed AFTER all routes)
app.use((err, req, res, next) => {
  console.error(err); // Optional: log full error

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
  });
});

export {app}