import { Router } from "express";
import { createContact, getAllContact } from "../controllers/contact.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();
router.route('/create-contact').post(verifyJwt,createContact);
router.route('/get-contacts').get(verifyJwt,getAllContact);

export default router