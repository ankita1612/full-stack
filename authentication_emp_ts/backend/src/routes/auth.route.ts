import express from "express";
import {authController}  from '../controllers/auth.controller'
import { validateLogin, validateRegister ,isRequestValidated } from '../validations/auth.validations'
import { singleUpload } from "../middleware/singleupload.middleware";

const authRouter = express.Router()

authRouter.post('/register', singleUpload.single('profile_image'), validateRegister, isRequestValidated, authController.register)
authRouter.post('/login', validateLogin, isRequestValidated, authController.login)
export default authRouter;