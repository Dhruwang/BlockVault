import express, { Request, Response } from "express";
import { loginUser } from "../controllers/authController";

const authRouter = express.Router()

authRouter.post("/loginUser", loginUser)

export {authRouter}