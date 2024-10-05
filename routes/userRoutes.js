import express from 'express';
import {  userLoginController, userRegisterController } from '../controllers/userController.js';

const userRoutes = express.Router()

// registration
userRoutes.post(`/register` , userRegisterController)

// login
userRoutes.post(`/login` , userLoginController)
export default userRoutes
