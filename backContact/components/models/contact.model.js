import mongoose ,{Schema} from "mongoose";

const contactSchema = new Schema({
    contactName :{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})
export const Contact = mongoose.model("Contact",contactSchema)