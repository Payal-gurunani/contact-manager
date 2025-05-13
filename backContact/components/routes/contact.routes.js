import { Router } from "express";
import { createContact } from "../controllers/contact.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();
router.route('/create-contact').post(verifyJwt,createContact);

export default router