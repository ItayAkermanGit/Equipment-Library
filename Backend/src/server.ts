import express from "express";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL;

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

async function start() {
  try {
    if (!mongoUrl) {
      throw new Error("The url is missing in the env file");
    }
    await mongoose.connect(mongoUrl);
    console.log("connection success");
    app.listen(port, () => {
      console.log(`Equipment library listening on port ${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
