import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Contact } from "../models/contact.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

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
 const getAllContact = asyncHandler(async (req , res,next) =>{
    
        const allContacts =  await Contact.find({user:req.user._id})
        if(!allContacts || allContacts.length === 0){
            throw ApiError(404,"No contacts available")
        }
    return res.status(200).json(
        new ApiResponse(200,"Contact get successfully",allContacts)
    )
    
 })
const updateContact = asyncHandler(async (req , res) =>{
    const {id} = req.params;
    console.log("Id requested from update" , id);

    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(400 , "Invalid Id ")
    }
    const update = req.body;
    const updateContact = await Contact.findByIdAndUpdate(
        { _id: id, user: req.user._id },
        update,
        {new:true, runValidators:true}
)

    if(!updateContact){
         throw new ApiError(404 , "Contact not found")
    }
    return res.status(200).json(
        new ApiResponse(200 , "Your data is update",updateContact)
    )
})

const deleteContact = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(400 , "Invalid Id ")
    }

    const deletedContact = await Contact.findOneAndDelete( { _id: id, user: req.user._id }
    )

    if(!deletedContact){
        throw new ApiError(404,"Contact not found")
    }
     return res.status(200).json(
        new ApiResponse(200 ,deletedContact, "Your data is deleted")
    )
})
export {createContact,getAllContact,updateContact ,deleteContact}