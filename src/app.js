const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Aditya",
    lastName: "Sharma",
    emailId: "aditya@gmail.com",
    age: "20",
    gender: "Male",
  };

  try {
    const user = new User(userOb);
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
