const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.end("User added Successfully!");
  } catch (err) {
    res.status(400).send("Error while saving user", err);
  }
});

connectDB()
  .then(() => {
    console.log("DB Connection Started");
    app.listen(7777, () => {
      console.log("Server started successfully");
    });
  })
  .catch((err) => {
    console.log("Error while connecting to DB", err);
  });
