import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/database.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();
connectDB();

app.use(express.json())
app.use(cookieParser())

app.use("/user",userRoutes)

app.get("/", (_, res) => {
  return res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
