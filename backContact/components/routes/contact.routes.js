import { Router } from "express";
import { createContact, deleteContact, getAllContact, updateContact } from "../controllers/contact.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();
router.route('/create-contact').post(verifyJwt,createContact);
router.route('/get-contacts').get(verifyJwt,getAllContact);
router.route('/update-contact/:id').put(verifyJwt,updateContact)
router.route('/delete-contact/:id').delete(verifyJwt,deleteContact)
export default router