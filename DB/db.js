const mongoose = require("mongoose");
async function connectDb() {
  try {
    console.log(process.env.DB_URI);
    await mongoose.connect(process.env.DB_URI);
    const connect = mongoose.connection;
    console.log("connected succesfully!");
  } catch (err) {
    console.log("unbale to connect to database " + err);
    process.exit(1);
  }
}
module.exports = connectDb;
