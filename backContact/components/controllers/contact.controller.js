import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { Contact } from "../models/contact.model";
import { ApiResponse } from "../utils/ApiResponse";
const createContact = asyncHandler(async (req,res)=>{
    const {contactName , email , phone } = req.body;

    if(!phone || !contactName){
        throw new ApiError(400,"Name or Phone number is required")
    }

    const existContact = await Contact.findOne({
        $or : [{phone} , {contactName}],
        user : req.user._id
    })
    if(existContact){
        throw new ApiError(400,"Contact with this name or phone number is already exist")
    }

    const newContact = await Contact.create({
        contactName , email , phone ,   user: req.user._id, 
    }) 
    if(!newContact){
        throw new ApiError(500,"Contact not created")
    }

    return res
    .status(200)
    .json(
       new ApiResponse(200 ,newContact,"contact created Successfully")
    )
})
export {createContact}