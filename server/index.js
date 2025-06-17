const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const router  = require("./routes.js");
const mongoose = require("mongoose");

(async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if (conn) console.log("MongoDB connected successfully!");
    else console.error("MongoDB connection error:", err);
  } catch (error) {
    console.error(error.message);
  }
})();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api/items", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening on Port: ", PORT);
});
