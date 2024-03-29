import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = express();
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://nyka-frontend-flax.vercel.app"
        : "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";

app.use("/api", userRouter);
app.use("/api", productRouter);
