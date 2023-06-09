"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
authRouter.post("/loginUser", authController_1.loginUser);
authRouter.get("/checkIsProfileCompleted", authController_1.checkIsProfileCompleted);
authRouter.get("/checkUser", authController_1.checkUserAddress);
authRouter.post("/createUser", authController_1.createUser);
