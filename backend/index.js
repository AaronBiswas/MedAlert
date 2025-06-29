import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/database.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import uploadRoutes from "./routes/upload.route.js";
import reminderRoutes from "./routes/reminder.route.js";
import cors from "cors";
import { protectRoute } from "./middleware/Auth.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();
connectDB();


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json())
app.use(cookieParser())


app.use("/user",userRoutes)
app.use("/upload",protectRoute,uploadRoutes)
app.use("/data",reminderRoutes);

app.get("/", (_, res) => {
  return res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
