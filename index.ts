import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import blogRouter from "./src/routes/blog";
// import userRouter from "./src/routes/users";
// import authRouter from "./src/routes/auth";
import dbConnection from "./src/db/connect";
// import notFoundMiddleware from "./src/middleware/not-found";
// import errorHandlerMiddleware from "./src/middleware/error-handler";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

dotenv.config();
const app = express();
const port = process.env.PORT || 3005;

// Testing GET method
app.get("/", (req: Request, res: Response) => {
  res.send('<h1>PORTIFOLIO BACKEND API</h1><a href="/api-docs">Documentation</a>');
});

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(cookieParser());
// app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/blog", blogRouter);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  })
);
// app.use(errorHandlerMiddleware);
// app.use(notFoundMiddleware);

const start = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "default_mongo_uri"; // Provide a default value
    await dbConnection(mongoURI);
    app.listen(port, () => {
      console.log(`Portifolio Backend App running on port ${port}!`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();