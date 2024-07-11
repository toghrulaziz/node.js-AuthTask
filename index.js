require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/authRoutes");
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();
app.use(express.json());
app.use(cors());

mongoose
    .connect(DATABASE_URL)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("Error connecting to MongoDB Atlas", err));

    
app.use("/todos", todoRoutes);
app.use("/auth", authRoutes);



port = 4000;
app.listen(4000, () => {
    console.log(`Server running on port ${port}`);
});