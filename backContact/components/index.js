
import connectDB from './dbs/index.db.js';
import dotenv from 'dotenv'
import {app} from '../components/app.js'
dotenv.config()
connectDB()
.then(()=>{
app.listen(5000 , ()=> console.log("App listening"))
app.on('error',(error)=>{
console.log(`server error${error}`);
throw error;

})
})
.catch((error)=>{
console.log("Connection failed",error);

})
