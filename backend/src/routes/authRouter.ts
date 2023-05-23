import express from "express";
import { loginUser,createUser,checkIsProfileCompleted } from "../controllers/authController";

const authRouter = express.Router()

authRouter.post("/loginUser", loginUser)
authRouter.get("/checkIsProfileCompleted", checkIsProfileCompleted)
authRouter.post("/createUser", createUser)

export {authRouter}