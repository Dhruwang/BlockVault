import express, { Request, Response } from 'express';
import mongoose,{ ConnectOptions }from 'mongoose';
import { authRouter } from './routes/authRouter';

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const collection = process.env.MONGO_COLLECTION

mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster.y4itcsl.mongodb.net/${collection}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const app = express();
const port = 8000;

// Middleware
app.use(express.json());
app.use("/auth",authRouter)

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});