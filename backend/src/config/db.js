const mongoose = require("mongoose");

async function connecttoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Database Connected Successfully");
  } catch (err) {
    console.log("Database Connection Error:", err.message);
    process.exit(1);
  }
}

module.exports = connecttoDB;