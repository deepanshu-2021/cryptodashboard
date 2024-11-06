// server.js
const express = require("express");
const { saveData, getData } = require("./controller/controller");
const path = require("path");
const connectDb = require("./DB/db");
const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require("dotenv");
const router = express.Router();
const cors = require("cors");
dotenv.config();
// Enable CORS for all routes and origins
app.use(cors());
//connecting the database
connectDb();
// Route for the main page
// saving the data from api into database
router.post("/data", saveData);
// return the data from database
router.get("/data", getData);
// router endpoint starts with /api
app.use("/api", router);
// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server running at Port ${PORT}`);
});
