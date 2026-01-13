import express from "express";
import {authController}  from '../controllers/auth.controller'
import { login, registration ,isRequestValidated } from '../validations/auth.validations'
const router = express.Router()
registration
router.post('/register',registration, isRequestValidated, authController.registration)
router.post('/login', authController.login)


export default router;