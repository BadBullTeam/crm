import  express from "express";
import auth from "./auth.js";
const router = new express.Router()

router.use('/auth', auth)

export default router;