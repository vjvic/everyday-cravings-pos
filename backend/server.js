import path from "path";
import express from "express";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cors from "cors";

import mealRoutes from "./routes/mealRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

/* import uploadRoutes from "./routes/uploadRoutes.js"; */

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/meals", mealRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
/* app.use("/api/upload", uploadRoutes); */

app.post("/api/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;
  const __dirname = path.resolve();

  file.mv(`${__dirname}/frontend/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

const PORT = process.env.PORT || 5000;

app.use(notFound);
app.use(errorHandler);

app.listen(
  5000,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
