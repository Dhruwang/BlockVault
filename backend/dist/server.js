"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter_1 = require("./routes/authRouter");
const app = (0, express_1.default)();
const port = 8000;
// Middleware
app.use(express_1.default.json());
app.use("/auth", authRouter_1.authRouter);
// Routes
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
