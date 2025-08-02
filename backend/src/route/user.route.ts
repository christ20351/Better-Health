import { Router } from "express";
import { login } from "../controllers/auth/login/login.controller";
import { register } from "../controllers/auth/register/user.register";


export const userRoute = Router()

userRoute.post('/register' , register)
userRoute.post('/login' , login)