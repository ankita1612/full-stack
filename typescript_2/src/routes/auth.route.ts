import express from "express";
import {authController}  from '../controllers/auth.controller'
import { login, registration ,isRequestValidated } from '../validations/auth.validations'
import { upload } from "../middleware/upload.middleware";

const router = express.Router()

router.post('/register',upload.single('profile_image'),registration, isRequestValidated, authController.registration)
router.post('/login' ,login, authController.login)

export default router;