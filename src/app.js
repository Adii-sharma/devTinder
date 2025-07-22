const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("This is Homepageee!");
});

app.get("/test", (req, res) => {
  res.send("Hello from test route!")
});

app.listen(3000, () => {
  console.log("Server started successfully");
});
