import express from "express";
import { loginUser,createUser,checkIsProfileCompleted,checkUserAddress } from "../controllers/authController";

const authRouter = express.Router()

authRouter.post("/loginUser", loginUser)
authRouter.get("/checkIsProfileCompleted", checkIsProfileCompleted)
authRouter.get("/checkUser", checkUserAddress)
authRouter.post("/createUser", createUser)

export {authRouter}