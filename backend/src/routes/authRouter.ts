import express from "express";
import { loginUser,createUser } from "../controllers/authController";

const authRouter = express.Router()

authRouter.post("/loginUser", loginUser)
authRouter.post("/createUser", createUser)

export {authRouter}