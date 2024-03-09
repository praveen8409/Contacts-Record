
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectToMongoDB from "./db/connectToMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import recordsRoutes from "./routes/record.routes.js";

const PORT = process.env.PORT || 5000;
dotenv.config();
const app = express();
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/records", recordsRoutes);

app.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});