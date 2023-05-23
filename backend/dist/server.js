"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRouter_1 = require("./routes/authRouter");
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const collection = process.env.MONGO_COLLECTION;
mongoose_1.default.connect(`mongodb+srv://${username}:${password}@cluster.y4itcsl.mongodb.net/${collection}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});
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
