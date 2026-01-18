import express from "express";
import {authController}  from '../controllers/auth.controller'
import { login, registration ,isRequestValidated } from '../validations/auth.validations'
import { upload } from "../middleware/upload.middleware";

const authRouter = express.Router()

authRouter.post('/register',upload.single('profile_image'),registration, isRequestValidated, authController.registration)
authRouter.post('/login' ,login, authController.login)

export default authRouter;