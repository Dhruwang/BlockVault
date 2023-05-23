import express, { Request, Response } from 'express';
import { authRouter } from './routes/authRouter';

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