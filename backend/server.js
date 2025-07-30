import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/db.js";
import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import testRoutes from "./routes/testRoutes.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://wellness-session.onrender.com/"], // frontend
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", sessionRoutes);
app.use("/api", testRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the MERN Authentication API");
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on: http://localhost:${PORT}`));
});
