import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import account from "./routes/account.js";
import people from "./routes/people.js";
import cors from "cors";
import path from "path";
dotenv.config({ path: "./config/config.env" });
const __dirname = path.resolve();
const app = express();

// Connecting MongoDB
connectDB();

app.use(cors());
app.use(express.json({ limit: 5000000 }));

//Routes
app.use("/api/auth", auth);
app.use("/api/account", account);
app.use("/api/people", people);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5050;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
