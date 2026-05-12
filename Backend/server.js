import express from "express";
import userRouter from "./router/userRouter.js";
import connectDb from "./config/dd.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
connectDb();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Api is working");
});

app.listen(PORT, () => {
  console.log(`server starting on ${PORT}`);
});
