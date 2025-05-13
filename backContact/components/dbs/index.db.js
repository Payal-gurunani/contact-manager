import mongoose from "mongoose";
import { DB_NAME } from "../../constants.js";

const connectDB = async () =>{
    try {
        const connectionDb = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`Connection successful ${connectionDb.connection.host}`);
        
    } catch (error) {
        console.log("Connection db fail",error);
        process.exit(1)
        
    }
}

export default connectDB