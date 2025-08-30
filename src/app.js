const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { Error } = require("mongoose");

const app = express();

app.use(express.json());

//find user by email
app.get("/user", async (req, res) => {
  try {
    const email = req.query.email;

    const userData = await User.find({ emailId: email }); // we can also use findOne method as we have to find specific user only

    if (userData.length > 0) {
      res.send(userData[0]);
    } else {
      res.send("User not exist");
    }
  } catch (err) {
    res.status(400).send("Error occured while funding user", err);
  }
});

//find all users
app.get("/feed", async (req, res) => {
  try {
    const userData = await User.find({});

    if (userData.length > 0) {
      res.send(userData);
    } else {
      res.send("No user exist");
    }
  } catch (err) {
    res.status(400).send("Error occured while funding user", err);
  }
});

//delete a user by Id
app.post("/delete-user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const userData = await User.findByIdAndDelete(userId);

    res.send("User deleted Successfully");
  } catch (err) {
    res.status(400).send("Error occured while deleting user", err);
  }
});

//update-user
app.patch("/update-user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const userData = req.body;

    const allowdUpdates = [
      "gender",
      "age",
      "photoUrl",
      "firstName",
      "lastName",
      "password",
      "about",
      "skills",
    ];

    const isUpdateAllowed = Object.keys(userData).every((k) =>
      allowdUpdates.includes(k)
    );

    if(userData?.skills?.length > 10){
      return res.status(400).send({message: "Skills cannot be more than 10"})
    }

    if (!isUpdateAllowed) {
      return res.status(400).send({ message: "Invalid entries in update" });
    }

    await User.findByIdAndUpdate({ _id: userId }, userData, {
      runValidators: true,
    });

    res.send("User updated Successfully");
  } catch (err) {
    console.log("error--->", err);
    res.status(400).send({
      message: "Error occurred while updating user",
      error: err.message,
    });
  }
});

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
