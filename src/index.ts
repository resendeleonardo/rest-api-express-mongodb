import express from "express";
import authRouter from "./routes/authRouter";
import connectDB from "./db/userDB";
import dotenv from "dotenv";
// import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { isAuthenticated } from "./middleware/authMiddleware";
import userRouter from "./routes/userRouter";

dotenv.config();

interface UserBasicInfo {
  _id: string;
  email: string;
  roles: string[];
}

declare global {
  namespace Express {
    interface Request {
      user?: UserBasicInfo | null;
    }
  }
}

const app = express();
const port = process.env.PORT || 3001;

app.use(helmet());

app.use(
  cors({
    origin: "",
    credentials: true,
  })
);

app.use(cookieParser());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api/auth", authRouter);
app.use("/api/users", isAuthenticated, userRouter);

connectDB();
