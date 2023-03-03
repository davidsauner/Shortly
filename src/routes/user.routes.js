import { Router } from "express";
import { userValidate } from '../middlewares/ValidateSchema.js';
import { getUser,getRank } from "../controllers/User.js";
const router = Router();

router.get("/users/me",userValidate, getUser)
router.get("/ranking",getRank)

export default router